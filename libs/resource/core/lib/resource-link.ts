import { blogPostDetailRouterHelper } from '@marmicode/shared/router-helpers';
import { ResourceType } from './resource-type';

/**
 * Internal route for the resources the site renders, the resource's URL otherwise.
 * Structurally a `Link` from `shared/ui`.
 */
export function getResourceLink({
  type,
  slug,
  url,
}: {
  type: ResourceType;
  slug: string;
  url: string;
}): { route: string[] } | { href: string } {
  const route = ROUTE_FACTORIES[type]?.(slug);
  return route != null ? { route } : { href: url };
}

const ROUTE_FACTORIES: Partial<
  Record<ResourceType, (slug: string) => string[]>
> = {
  [ResourceType.BlogPost]: (slug) =>
    blogPostDetailRouterHelper.blogPostDetail(slug),
};
