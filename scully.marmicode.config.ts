import { ScullyConfig } from '@scullyio/scully';
import axios from 'axios';

export const config: ScullyConfig = {
  outDir: 'dist/apps/marmicode/static',
  routes: {},
  extraRoutes: getExtraRoutes(),
};

async function getExtraRoutes() {
  return ['/services', ...(await getLearnBySkillRoutes())];
}

async function getLearnBySkillRoutes() {
  const { data } = await axios.get(
    'https://cdn.contentful.com/spaces/gowvxq3b4aid/environments/master/entries?content_type=skill&select=fields.slug',
    {
      headers: {
        Authorization: `Bearer _d7Vb4r2lborp1uLTvsv0ne7fB0OMez2FscTnHQux5A`,
      },
    }
  );
  const skillSlugs = [
    'everything',
    ...data.items.map((item) => item.fields.slug),
  ];
  return skillSlugs.map((slug) => `/learn/${slug}`);
}
