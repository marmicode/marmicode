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
  const { data } = await _queryContentful({
    content_type: 'skill',
    select: 'fields.slug',
  });
  const skillSlugs = [
    'everything',
    ...data.items.map((item) => item.fields.slug),
  ];
  return skillSlugs.map((slug) => `/learn/${slug}`);
}

async function _getBlogPostRoutes() {
  const { data } = await _queryContentful({
    content_type: 'resource',
    'fields.resourceType': 'blog-post',
    select: 'fields.slug',
  });
  return data.items.map((item) => `/blog/${item.fields.slug}`);
}

async function _getRecipeRoutes() {
  const { data } = await _queryContentful({
    content_type: 'resource',
    'fields.resourceType': 'recipe',
    select: 'fields.slug',
  });
  return data.items.map((item) => `/recipe/${item.fields.slug}`);
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
