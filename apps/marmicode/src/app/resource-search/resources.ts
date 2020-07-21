import { createResource } from './resource';
import { ResourceType } from './resource-type';
import {
  angularLazyLoading,
  angularModules,
  jasmine,
  jest,
  limbo,
  modulelessAngular,
  scam,
  tcr,
  timeboxedTdd,
  typescript,
} from './skills';

export const younes = {
  name: 'Younes Jaaidi',
  pictureUri: '/assets/authors/younes.jpg',
};

const yourAngularModuleIsAScam = createResource({
  author: younes,
  pictureUri: '/assets/resources/your-angular-module-is-a-scam.gif',
  summary: `Angular modules can bring some complexity to your app.
  Choosing the right modules architecture is tricky... but wait, do we really need modules?`,
  title: 'Your Angular Module is a SCAM!',
  type: ResourceType.BlogPost,
  skills: [modulelessAngular.id, scam.id],
  requiredSkills: [angularModules.id, angularLazyLoading.id],
  url:
    'https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b',
});

const boostYourTimeToMarketByDancingTheLimbo = createResource({
  author: younes,
  pictureUri:
    '/assets/resources/boost-your-time-to-market-by-dancing-the-limbo.jpg',
  summary: `Stale or long-lived branches, conflicts & huge code reviews can cause technical and human issues in your team. In this talk, Younes demonstrates some alternative and sometimes extreme approaches promoting single-branch development with techniques like Limbo, Timeboxed TDD and Test && Commit || Revert.`,
  title: 'Boost Your Time to Market by Dancing the Limbo',
  type: ResourceType.Video,
  skills: [limbo.id, timeboxedTdd.id, tcr.id],
  requiredSkills: [jasmine.id, jest.id, typescript.id],
  url: 'https://www.youtube.com/watch?v=izGz7H-8yIk',
});

export const resources = [
  yourAngularModuleIsAScam,
  boostYourTimeToMarketByDancingTheLimbo,
];
