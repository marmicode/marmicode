import axios from 'axios';
import { writeFile } from 'fs/promises';

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error(`Usage: update-routes -o <output-file>`);
  }

  const option = args.shift();
  if ('-o' !== option) {
    throw new Error(`Unknown option: ${option}`);
  }

  const outputFilePath = args.shift();
  if (!outputFilePath) {
    throw new Error(`Missing output file path`);
  }

  const routes = await updateRoutes({ outputFilePath });
  console.log(`✨ ${routes.length} routes updated!`);
}

async function updateRoutes({ outputFilePath }: { outputFilePath: string }) {
  const routes = await _getRoutes();
  await writeFile(outputFilePath, routes.join('\n') + '\n');
  return routes;
}

async function _getRoutes() {
  return [
    '/',
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
  const { data } = await _queryContentful<{
    items: Array<{ fields: { slug: string } }>;
  }>({ ...params, select: 'fields.slug' });

  return data.items.map((item) => item.fields.slug);
}

async function _queryContentful<T>(params: { [key: string]: string }) {
  return await axios.get<T>(
    'https://cdn.contentful.com/spaces/gowvxq3b4aid/environments/master/entries',
    {
      headers: {
        Authorization: `Bearer _d7Vb4r2lborp1uLTvsv0ne7fB0OMez2FscTnHQux5A`,
      },
      params,
    }
  );
}
