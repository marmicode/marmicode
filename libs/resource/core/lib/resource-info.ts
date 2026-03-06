import { ResourceType } from './resource-type';

export interface Author {
  name: string;
  pictureUri?: string | null;
}

export function createAuthor(author: Author) {
  return { ...author };
}

export interface ResourceInfo {
  author?: Author;
  duration: number;
  pictureUri?: string | null;
  releasedAt: Date | null;
  title: string;
  type: ResourceType;
}
