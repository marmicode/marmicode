import { ResourceType } from './resource-type';

export interface Author {
  name: string;
  pictureUri: string;
}

export function createAuthor(author: Author) {
  return { ...author };
}

export interface Resource {
  id?: string;
  type: ResourceType;
  author?: Author;
  skills: string[];
  requiredSkills: string[];
  title: string;
  pictureUri?: string;
  summary: string;
  url: string;
}

export function createResource(resource: Resource) {
  return { ...resource };
}
