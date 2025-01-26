import { unstable_cache } from "next/cache";
import pluralize from "pluralize";
import QueryString from "qs";
import { IS_DEVELOPMENT } from "./environment";

/**
 * Represents the structure of a Strapi API response.
 * @template T The type of the data returned by the API.
 */
export type StrapiResponse<T> = {
  /** The main data returned by the API. Can be a single item or an array. */
  data: StrapiBaseData<T>[] | StrapiBaseData<T>;
  /** Metadata about the response, including pagination information. */
  meta: StrapiMeta;
  /** Error information, if an error occurred. */
  error?: StrapiError;
};

/**
 * Extends a type with Strapi's base data fields.
 * @template T The type to extend with Strapi base fields.
 */
export type StrapiBaseData<T> = T & {
  /** The numeric ID of the item. */
  id: number;
  /** The unique document ID of the item. */
  documentId: string;
  /** The creation date of the item. */
  createdAt: string;
  /** The last update date of the item. */
  updatedAt: string;
  /** The publication date of the item, if applicable. */
  publishedAt?: string;
  /** The locale of the item, if applicable. */
  locale?: string;
};

/**
 * Represents the structure of a Strapi API error.
 */
export type StrapiError = {
  /** The HTTP status code of the error. */
  status: number;
  /** The name or type of the error. */
  name: string;
  /** A descriptive message about the error. */
  message: string;
};

/**
 * Represents the metadata returned in a Strapi API response.
 */
export type StrapiMeta = {
  /** Pagination information. */
  pagination: {
    /** The current page number. */
    page: number;
    /** The number of items per page. */
    pageSize: number;
    /** The total number of pages. */
    pageCount: number;
    /** The total number of items across all pages. */
    total: number;
  };
};

/**
 * Represents the available filter operators in Strapi queries.
 */
type StrapiFilterOperators = {
  /** Equal to
   * @example { price: { $eq: 100 } }
   */
  $eq?: any;
  /** Equal to (case-insensitive)
   * @example { title: { $eqi: 'hello world' } }
   */
  $eqi?: any;
  /** Not equal to
   * @example { status: { $ne: 'archived' } }
   */
  $ne?: any;
  /** Not equal to (case-insensitive)
   * @example { category: { $nei: 'news' } }
   */
  $nei?: any;
  /** Less than
   * @example { age: { $lt: 18 } }
   */
  $lt?: any;
  /** Less than or equal to
   * @example { price: { $lte: 50.99 } }
   */
  $lte?: any;
  /** Greater than
   * @example { views: { $gt: 1000 } }
   */
  $gt?: any;
  /** Greater than or equal to
   * @example { rating: { $gte: 4.5 } }
   */
  $gte?: any;
  /** Included in array
   * @example { category: { $in: ['food', 'travel'] } }
   */
  $in?: any[];
  /** Not included in array
   * @example { tag: { $notIn: ['deprecated', 'legacy'] } }
   */
  $notIn?: any[];
  /** Contains substring
   * @example { description: { $contains: 'special offer' } }
   */
  $contains?: string;
  /** Does not contain substring
   * @example { title: { $notContains: 'draft' } }
   */
  $notContains?: string;
  /** Contains substring (case-insensitive)
   * @example { name: { $containsi: 'john' } }
   */
  $containsi?: string;
  /** Does not contain substring (case-insensitive)
   * @example { email: { $notContainsi: 'spam' } }
   */
  $notContainsi?: string;
  /** Is null
   * @example { deletedAt: { $null: true } }
   */
  $null?: boolean;
  /** Is not null
   * @example { publishedAt: { $notNull: true } }
   */
  $notNull?: boolean;
  /** Between two values
   * @example { price: { $between: [10, 20] } }
   */
  $between?: [any, any];
  /** Starts with
   * @example { slug: { $startsWith: 'blog-' } }
   */
  $startsWith?: string;
  /** Starts with (case-insensitive)
   * @example { title: { $startsWithi: 'the' } }
   */
  $startsWithi?: string;
  /** Ends with
   * @example { filename: { $endsWith: '.pdf' } }
   */
  $endsWith?: string;
  /** Ends with (case-insensitive)
   * @example { email: { $endsWithi: '@gmail.com' } }
   */
  $endsWithi?: string;
};

/**
 * Represents the available logical operators for combining filters in Strapi queries.
 */
type StrapiLogicalOperators = {
  /** Combines multiple conditions with AND logic. */
  $and?: StrapiFilter[];
  /** Combines multiple conditions with OR logic. */
  $or?: StrapiFilter[];
  /** Negates the given condition. */
  $not?: StrapiFilter;
};

/**
 * Represents a complete Strapi filter, combining filter operators and logical operators.
 */
type StrapiFilter = StrapiFilterOperators &
  StrapiLogicalOperators & {
    [key: string]: StrapiFilter | any;
  };

/**
 * Represents the available options for populating relations in Strapi queries.
 */
type StrapiPopulateOperators = {
  /** Specifies which fields to include in the populated data. */
  fields?: string[];
  /** Applies filters to the populated data. */
  filters?: StrapiFilter;
  /** Specifies the sort order for the populated data. */
  sort?: string | string[];
  /** Allows nested population of relations. */
  populate?: StrapiPopulate;
};

/**
 * Represents the structure for populating components in Strapi queries.
 */
type StrapiComponentPopulate = {
  [componentName: string]: boolean | StrapiPopulateOperators;
};

/**
 * Represents the structure for populating dynamic zones in Strapi queries.
 */
type StrapiDynamicZonePopulate = {
  /** Specifies which components to populate within the dynamic zone. */
  on?: StrapiComponentPopulate;
} & StrapiPopulateOperators;

/**
 * Represents all possible ways to specify population in Strapi queries.
 */
type StrapiPopulate =
  | "*"
  | string
  | string[]
  | Record<string, boolean | StrapiPopulateOperators | StrapiDynamicZonePopulate>
  | {
      [key: string]: StrapiPopulate | StrapiPopulateOperators | StrapiDynamicZonePopulate;
    };

/**
 * Represents all available options for querying the Strapi API.
 */
export type StrapiQueryOptions = {
  /**
   * @example 'title' - Sort by title in ascending order
   * @example '-publishedAt' - Sort by publishedAt in descending order
   * @example ['title', '-publishedAt'] - Sort by title ascending, then publishedAt descending
   */
  sort?: string | string[];
  /**
   * @example
   * ```ts
   * filters: {
   *   title: { $eq: "My Title" }
   * }
   * ```
   * @example
   * ```ts
   * filters: {
   *   $and: [{ title: { $eq: "My Title" } }, { publishedAt: { $notNull: true } }]
   * }
   * ```
   */
  filters?: StrapiFilter;
  /**
   * @example '*' - Populate all relations
   * @example 'field1,field2' - Populate specific fields
   * @example ['field1', 'field2'] - Populate specific fields
   * @example { field1: true, field2: { populate: '*' } } - Nested populate
   * @example { dynamicZone: { on: { 'component.name': { fields: ['field1'] } } } } - Populate dynamic zone
   * @example { component: { fields: ['field1'], populate: { relation: true } } } - Populate component
   */
  populate?: StrapiPopulate;
  /**
   * @example ['field1', 'field2'] - Select specific fields
   */
  fields?: string[];
  /**
   * @example { page: 1, pageSize: 10, withCount: true }
   */
  pagination?: {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
  };
  status?: "draft" | "published";
  locale?: string | string[];
};

/**
 * Extracts keys from type T where the value extends type V.
 * This is useful for finding keys of a certain type within an object type.
 * @template T The type to extract keys from
 * @template V The type that the value should extend
 */
type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

/**
 * Extracts the type of elements in an array type, or returns the original type if it's not an array.
 * This is useful for working with both array and non-array types in a generic context.
 * @template T The type to unwrap
 */
type UnwrapArray<T> = T extends (infer U)[] ? U : T;

/**
 * Extracts keys from type T (or its array element type) where the value is an object or array.
 * This is used to determine which fields can be populated in a Strapi query.
 * @template T The type to extract populate keys from
 */
type PopulateKeys<T> = KeysMatching<UnwrapArray<T>, object | any[]>;

/**
 * Recursively builds a type for the populate option based on the structure of type T.
 * This allows for type-safe and auto-completed populate options in Strapi queries.
 * @template T The type to infer the populate structure from
 */
type InferredPopulate<T> = {
  [K in PopulateKeys<T>]?: boolean | StrapiPopulateOperators | InferredPopulate<UnwrapArray<T>[K]>;
};

/**
 * Infers the structure of the populate option based on the given type T.
 * @template T The type to infer the populate structure from.
 */
export type StrapiInferredQueryOptions<T> = Omit<StrapiQueryOptions, "populate"> & {
  populate?: StrapiPopulate | InferredPopulate<T>;
};

/**
 * Queries the Strapi API with type inference for improved autocompletion.
 * Results are cached using unstable_cache for improved performance.
 * @template T The expected type of the API response data.
 * @param path The API endpoint path.
 * @param options Query options including filters, sort, populate, etc.
 * @param fetchOptions Additional options for the fetch call.
 * @returns A promise that resolves to the API response data with metadata.
 */
export async function strapiQuery<T>({
  path,
  options = {},
  fetchOptions = {},
  tags = [],
}: {
  path: string;
  options?: StrapiInferredQueryOptions<T>;
  fetchOptions?: RequestInit;
  tags?: string[];
}) {
  const query = QueryString.stringify(options, { encodeValuesOnly: true });
  const baseUrl = process.env.STRAPI_BASE_URL;
  const apiToken = process.env.STRAPI_API_TOKEN;
  const url = `${baseUrl}/${path}?${query}`;
  const transformedFetchOptions = {
    method: "GET",
    ...fetchOptions,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      ...fetchOptions.headers,
    },
  };

  try {
    const json =
      // only cache GET requests
      transformedFetchOptions.method === "GET" ?
        await unstable_cache(
          async () => {
            return (await fetch(url, transformedFetchOptions).then((res) =>
              res.json()
            )) as StrapiResponse<T>;
          },
          [path, query],
          {
            tags: [
              pluralize(path),
              pluralize(path, 1),
              ...(tags?.map((tag) => pluralize(tag)) || []),
              ...(tags?.map((tag) => pluralize(tag, 1)) || []),
            ],
          }
        )()
      : ((await fetch(url, transformedFetchOptions).then((res) =>
          res.json()
        )) as StrapiResponse<T>);

    if (IS_DEVELOPMENT) {
      const dataSize = (JSON.stringify(json).length / 1024).toFixed(1);

      const getColor = (size: string) => {
        if (parseFloat(size) < 10) return "\x1b[32m";
        if (parseFloat(size) < 100) return "\x1b[33m";
        if (parseFloat(size) < 250) return "\x1b[93m";
        if (parseFloat(size) < 500) return "\x1b[91m";
        return "\x1b[31m"; // red for large data
      };

      console.log(`${getColor(dataSize)}   [ ${dataSize} kB ] from ${url}\x1b[0m`);
    }

    if (json.error) {
      throw new Error(json.error.message);
    }

    return { data: (json.data || json || {}) as T, meta: json.meta || {} };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
