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
  pictureUri: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
};

const yourAngularModuleIsAScam = createResource({
  author: younes,
  pictureUri: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  summary: `The Shiba Inu is the smallest of the six original and distinct spitz
          breeds of dog from Japan. A small, agile dog that copes very well with
          mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  title: 'Your Angular Module is a SCAM!',
  type: ResourceType.BlogPost,
  skills: [modulelessAngular.id, scam.id],
  requiredSkills: [angularModules.id, angularLazyLoading.id],
  url:
    'https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b',
});

const boostYourTimeToMarketByDancingTheLimbo = createResource({
  author: younes,
  pictureUri: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  summary: `The Shiba Inu is the smallest of the six original and distinct spitz
          breeds of dog from Japan. A small, agile dog that copes very well with
          mountainous terrain, the Shiba Inu was originally bred for hunting.`,
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
