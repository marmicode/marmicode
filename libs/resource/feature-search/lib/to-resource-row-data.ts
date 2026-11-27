import {
  getResourceKind,
  getResourceLink,
  RESOURCE_TOPICS,
} from '@marmicode/resource/core';
import { ResourceRowData } from '@marmicode/resource/ui';
import { Resource } from './resource';

export function toResourceRowData(resource: Resource): ResourceRowData {
  return {
    title: resource.title,
    summary: resource.summary,
    kind: getResourceKind(resource.type),
    /* Dates become strings when they go through transfer state. */
    releasedAt: new Date(resource.releasedAt),
    duration: resource.duration,
    pictureUri: resource.pictureUri,
    topicLabels: RESOURCE_TOPICS.filter(({ value }) =>
      resource.topics.includes(value),
    ).map(({ label }) => label),
    link: getResourceLink(resource),
  };
}
