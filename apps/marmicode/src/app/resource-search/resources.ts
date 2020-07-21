import { createResource } from './resource';
import { ResourceType } from './resource-type';
import {
  angularCliBasics,
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

const angularCliOverviewAndCommandReference = createResource({
  type: ResourceType.Documentation,
  title: 'Angular CLI Overview and Command Reference',
  duration: 5,
  pictureUri: '/assets/resources/angular.svg',
  requiredSkills: [],
  skills: [angularCliBasics.id],
  summary: `An introduction to the Angular CLI by the Angular team`,
  url: 'https://angular.io/cli#cli-overview-and-command-reference',
});

const boostYourTimeToMarketByDancingTheLimbo = createResource({
  type: ResourceType.Video,
  title: 'Boost Your Time to Market by Dancing the Limbo',
  author: younes,
  duration: 33,
  pictureUri:
    '/assets/resources/boost-your-time-to-market-by-dancing-the-limbo.jpg',
  requiredSkills: [jasmine.id, jest.id, typescriptBasics.id],
  skills: [limbo.id, timeboxedTdd.id, tcr.id],
  summary: `Stale or long-lived branches, conflicts & huge code reviews can cause technical and human issues in your team. In this talk, Younes demonstrates some alternative and sometimes extreme approaches promoting single-branch development with techniques like Limbo, Timeboxed TDD and Test && Commit || Revert.`,
  url: 'https://www.youtube.com/watch?v=izGz7H-8yIk',
});

const yourAngularModuleIsAScam = createResource({
  type: ResourceType.BlogPost,
  title: 'Your Angular Module is a SCAM!',
  author: younes,
  duration: 4,
  pictureUri: '/assets/resources/your-angular-module-is-a-scam.gif',
  requiredSkills: [angularModules.id, angularLazyLoading.id],
  skills: [modulelessAngular.id, scam.id],
  summary: `Angular modules can bring some complexity to your app.
  Choosing the right modules architecture is tricky... but wait, do we really need modules?`,
  url:
    'https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b',
});

const typescriptIn5Minutes = createResource({
  type: ResourceType.Documentation,
  title: 'TypeScript in 5 minutes',
  duration: 5,
  pictureUri: '/assets/resources/typescript.jpg',
  requiredSkills: [],
  skills: [typescriptBasics.id],
  summary: `Unsurprisingly, the official TypeScript documentation contains one of the best introductions to TypeScript.`,
  url:
    'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
});

export const resources = [
  angularCliOverviewAndCommandReference,
  boostYourTimeToMarketByDancingTheLimbo,
  typescriptIn5Minutes,
  yourAngularModuleIsAScam,
];
