import { blocks } from "../../components/block-render/blocks";

export interface Media {
  blurhash: string;
  name: string;
  alternativeText?: string | null;
  url: string;
  caption?: string | null;
  width: number;
  height: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface DynamicZone {
  id: number;
  __component: keyof typeof blocks;
}
