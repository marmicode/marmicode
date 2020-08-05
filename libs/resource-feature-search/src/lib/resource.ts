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
  type: ResourceType;
  title: string;
  author?: Author;
  duration: number;
  pictureUri?: string;
  requiredSkills: Skill[];
  skills: Skill[];
  summary: string;
  url: string;
}

export function createResource(resource: Resource) {
  return { ...resource };
}
