import { createSkill, Skill } from './skill';
import { typescript } from '../topics/topics';

export const angularLazyLoading = createSkill({
  id: 'angular-lazy-loading',
  label: 'Angular Lazy Loading',
});

export const angularModules = createSkill({
  id: 'angular-modules',
  label: 'Angular Modules',
});

export const jasmine = createSkill({
  id: 'jasmine',
  label: 'Jasmine',
});

export const jest = createSkill({
  id: 'jest',
  label: 'Jest',
});

export const limbo = createSkill({
  id: 'limbo',
  label: 'Limbo',
});

export const modulelessAngular = createSkill({
  id: 'moduleless-angular',
  label: 'Moduleless Angular',
});

export const scam = createSkill({
  id: 'scam',
  label: 'Single Component Angular Module',
});

export const tcr = createSkill({
  id: 'tcr',
  label: 'TCR',
});

export const timeboxedTdd = createSkill({
  id: 'timeboxed-tdd',
  label: 'Timeboxed TDD',
});

export const typescriptBasics = createSkill({
  id: 'typescript-basics',
  label: 'TypeScript Basics',
  topicId: typescript.id,
});

export const skills: Skill[] = [
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
];
