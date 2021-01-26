import { ScullyConfig } from '@scullyio/scully';
import axios from 'axios';

export const config: ScullyConfig = {
  outDir: 'dist/apps/marmicode/static',
  routes: {},
  extraRoutes: _getExtraRoutes(),
};

async function _getExtraRoutes() {
  return [
    '/services',
    ...(await _getLearnBySkillRoutes()),
    ...(await _getBlogPostRoutes()),
    ...(await _getRecipeRoutes()),
  ];
}

async function _getLearnBySkillRoutes() {
  const slugs = await _querySlugs({ content_type: 'skill' });
  return ['everything', ...slugs].map((slug) => `/learn/${slug}`);
}

async function _getBlogPostRoutes() {
  const slugs = await _querySlugs({
    content_type: 'resource',
    'fields.resourceType': 'blog-post',
  });
  return slugs.map((slug) => `/blog/${slug}`);
}

async function _getRecipeRoutes() {
  const slugs = await _querySlugs({
    content_type: 'resource',
    'fields.resourceType': 'recipe',
  });
  return slugs.map((slug) => `/recipe/${slug}`);
}

async function _querySlugs(params: {
  [key: string]: string;
}): Promise<string[]> {
  const { data } = await _queryContentful({ ...params, select: 'fields.slug' });
  return data.items.map((item) => item.fields.slug);
}

async function _queryContentful(params: { [key: string]: string }) {
  return await axios.get(
    'https://cdn.contentful.com/spaces/gowvxq3b4aid/environments/master/entries',
    {
      headers: {
        Authorization: `Bearer _d7Vb4r2lborp1uLTvsv0ne7fB0OMez2FscTnHQux5A`,
      },
      params,
    }
  );
}
