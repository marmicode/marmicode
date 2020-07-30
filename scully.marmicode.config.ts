import { RouteTypes, ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  outDir: 'dist/apps/marmicode/static',
  routes: {
    '/services': {
      type: RouteTypes.default,
    },
  },
  extraRoutes: ['/learn/everything'],
};
