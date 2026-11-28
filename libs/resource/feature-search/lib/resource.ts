import { ResourceInfo, ResourceTopic } from '@marmicode/resource/core';
import { Skill } from './skill';

export interface Resource extends ResourceInfo {
  id?: string;
  requiredSkills: Skill[];
  slug: string;
  skills: Skill[];
  summary: string;
  topics: ResourceTopic[];
  url: string;
  isWip?: boolean;
}

export function createResource(resource: Resource) {
  return { ...resource };
}
