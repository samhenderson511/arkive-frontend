export const constructSlug = (subDepartment: string | undefined, name: string) => {
  return [...(subDepartment?.split(" > ").slice(1) || []), encodeURIComponent(name)]
    .filter(Boolean)
    .join("/")
    .toLowerCase();
};
