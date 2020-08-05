import { ResourceType } from '@marmicode/resource-core';
import { Skill } from './skill';

export interface Author {
  name: string;
  pictureUri: string;
}

export function createAuthor(author: Author) {
  return { ...author };
}

export interface Resource {
  id?: string;
  author?: Author;
  duration: number;
  pictureUri?: string;
  requiredSkills: Skill[];
  slug: string;
  skills: Skill[];
  summary: string;
  title: string;
  type: ResourceType;
  url: string;
  isWip?: boolean;
}

export function createResource(resource: Resource) {
  return { ...resource };
}
