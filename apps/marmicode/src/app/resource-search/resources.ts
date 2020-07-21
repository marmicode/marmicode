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
  typescriptBasics,
} from './skills';

export const younes = {
  name: 'Younes Jaaidi',
  pictureUri: '/assets/authors/younes.jpg',
};

const typescriptIn5Minutes = createResource({
  type: ResourceType.Documentation,
  title: 'TypeScript in 5 minutes',
  url:
    'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
  pictureUri: '/assets/resources/typescript-in-5-minutes.png',
  summary: `Unsurprisingly, the official TypeScript documentation contains one of the best introductions to TypeScript.`,
  skills: [typescriptBasics.id],
  requiredSkills: [],
});

const boostYourTimeToMarketByDancingTheLimbo = createResource({
  type: ResourceType.Video,
  author: younes,
  title: 'Boost Your Time to Market by Dancing the Limbo',
  url: 'https://www.youtube.com/watch?v=izGz7H-8yIk',
  pictureUri:
    '/assets/resources/boost-your-time-to-market-by-dancing-the-limbo.jpg',
  summary: `Stale or long-lived branches, conflicts & huge code reviews can cause technical and human issues in your team. In this talk, Younes demonstrates some alternative and sometimes extreme approaches promoting single-branch development with techniques like Limbo, Timeboxed TDD and Test && Commit || Revert.`,
  skills: [limbo.id, timeboxedTdd.id, tcr.id],
  requiredSkills: [jasmine.id, jest.id, typescriptBasics.id],
});

const yourAngularModuleIsAScam = createResource({
  type: ResourceType.BlogPost,
  author: younes,
  title: 'Your Angular Module is a SCAM!',
  url:
    'https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b',
  pictureUri: '/assets/resources/your-angular-module-is-a-scam.gif',
  summary: `Angular modules can bring some complexity to your app.
  Choosing the right modules architecture is tricky... but wait, do we really need modules?`,
  skills: [modulelessAngular.id, scam.id],
  requiredSkills: [angularModules.id, angularLazyLoading.id],
});

export const resources = [
  boostYourTimeToMarketByDancingTheLimbo,
  typescriptIn5Minutes,
  yourAngularModuleIsAScam,
];
