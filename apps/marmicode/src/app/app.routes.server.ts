import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import {
  blogPostDetailRouterHelper,
  recipeDetailRouterHelper,
  resourceSearchRouterHelper,
  servicesRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { WorkshopRepository } from '@marmicode/workshop/infra';

const CONTENTFUL_API =
  'https://cdn.contentful.com/spaces/gowvxq3b4aid/environments/master/entries';
const CONTENTFUL_TOKEN = '_d7Vb4r2lborp1uLTvsv0ne7fB0OMez2FscTnHQux5A';

export const serverRoutes: ServerRoute[] = [
  /* Landing */
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  /* Services */
  {
    path: servicesRouterHelper.SERVICES_PATH,
    renderMode: RenderMode.Prerender,
  },
  /* Workshops list */
  {
    path: workshopRouterHelper.WORKSHOP_LIST_PATH,
    renderMode: RenderMode.Prerender,
  },
  /* Workshop detail */
  {
    path: workshopRouterHelper.WORKSHOP_DETAIL_PATH,
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const workshopRepo = inject(WorkshopRepository);
      return workshopRepo.getWorkshops().map((w) => ({ workshopId: w.id }));
    },
  },
  /* Learn by skill */
  {
    path: `${resourceSearchRouterHelper.LEARN_PATH}/:${resourceSearchRouterHelper.SKILL_SLUG_PARAM}`,
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const slugs = await _queryContentfulSlugs({ content_type: 'skill' });
      return [
        {
          [resourceSearchRouterHelper.SKILL_SLUG_PARAM]:
            resourceSearchRouterHelper.EVERYTHING,
        },
        ...slugs.map((slug) => ({
          [resourceSearchRouterHelper.SKILL_SLUG_PARAM]: slug,
        })),
      ];
    },
  },
  /* Blog post detail */
  {
    path: `${blogPostDetailRouterHelper.BLOG_POST_DETAIL_PATH}/:${blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM}`,
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const slugs = await _queryContentfulSlugs({
        content_type: 'resource',
        'fields.resourceType': 'blog-post',
      });
      return slugs.map((slug) => ({
        [blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM]: slug,
      }));
    },
  },
  /* Recipe detail */
  //   {
  //     path: `${recipeDetailRouterHelper.RECIPE_DETAIL_PATH}/:${recipeDetailRouterHelper.RECIPE_SLUG_PARAM}`,
  //     renderMode: RenderMode.Prerender,
  //     async getPrerenderParams() {
  //       const slugs = await _queryContentfulSlugs({
  //         content_type: 'resource',
  //         'fields.resourceType': 'recipe',
  //       });
  //       return slugs.map((slug) => ({
  //         [recipeDetailRouterHelper.RECIPE_SLUG_PARAM]: slug,
  //       }));
  //     },
  //   },
  /* Catch-all: fallback to CSR */
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];

async function _queryContentfulSlugs(
  params: Record<string, string>,
): Promise<string[]> {
  const searchParams = new URLSearchParams({
    ...params,
    select: 'fields.slug',
  });
  const response = await fetch(`${CONTENTFUL_API}?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${CONTENTFUL_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status}`);
  }
  const data = (await response.json()) as {
    items: Array<{ fields: { slug: string } }>;
  };
  return data.items.map((item) => item.fields.slug);
}
