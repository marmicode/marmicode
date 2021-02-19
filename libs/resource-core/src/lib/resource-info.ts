import { ResourceType } from '@marmicode/resource-core';

export interface Author {
  name: string;
  pictureUri: string;
}

export function createAuthor(author: Author) {
  return { ...author };
}

export interface ResourceInfo {
  author?: Author;
  duration: number;
  pictureUri?: string;
  releasedAt: Date;
  title: string;
  type: ResourceType;
}
