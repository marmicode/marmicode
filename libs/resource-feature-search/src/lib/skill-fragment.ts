import gql from 'graphql-tag';
import { createSkill } from './skill';
import * as schema from '@marmicode/contentful-api';

export const skillFragment = gql`
  fragment SkillFragment on Skill {
    sys {
      id
    }
    label
    slug
  }
`;

export function skillFragmentToSkill(skill: schema.Skill) {
  return createSkill({
    id: skill.sys.id,
    label: skill.label,
    slug: skill.slug,
  });
}
