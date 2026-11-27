import {
  getResourceKind,
  RESOURCE_TOPICS,
  ResourceType,
} from '@marmicode/resource/core';
import { ResourceRowData } from '@marmicode/resource/ui';
import { blogPostDetailRouterHelper } from '@marmicode/shared/router-helpers';
import { Link } from '@marmicode/shared/ui';
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

/**
 * Internal route for the resources the site renders, the resource's URL otherwise,
 * as `ResourceCardActionComponent` does.
 */
function getResourceLink(resource: Resource): Link {
  const route = ROUTE_FACTORIES[resource.type]?.(resource.slug);
  return route != null ? { route } : { href: resource.url };
}

const ROUTE_FACTORIES: Partial<
  Record<ResourceType, (slug: string) => string[]>
> = {
  [ResourceType.BlogPost]: (slug) =>
    blogPostDetailRouterHelper.blogPostDetail(slug),
};
