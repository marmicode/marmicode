import { createSkill, Skill } from './skill';
import { cli, typescript } from '../topics/topics';

export const skills = {
  angularCliBasics: createSkill({
    id: 'angular-cli-basics',
    label: 'Angular CLI Basics',
    topicId: cli.id,
  }),
  angularLazyLoading: createSkill({
    id: 'angular-lazy-loading',
    label: 'Angular Lazy Loading',
  }),
  angularModules: createSkill({
    id: 'angular-modules',
    label: 'Angular Modules',
  }),
  jasmine: createSkill({
    id: 'jasmine',
    label: 'Jasmine',
  }),
  jest: createSkill({
    id: 'jest',
    label: 'Jest',
  }),
  limbo: createSkill({
    id: 'limbo',
    label: 'Limbo',
  }),
  modulelessAngular: createSkill({
    id: 'moduleless-angular',
    label: 'Moduleless Angular',
  }),
  scam: createSkill({
    id: 'scam',
    label: 'Single Component Angular Module',
  }),
  tcr: createSkill({
    id: 'tcr',
    label: 'TCR',
  }),
  timeboxedTdd: createSkill({
    id: 'timeboxed-tdd',
    label: 'Timeboxed TDD',
  }),
  typescriptBasics: createSkill({
    id: 'typescript-basics',
    label: 'TypeScript Basics',
    topicId: typescript.id,
  }),
};
