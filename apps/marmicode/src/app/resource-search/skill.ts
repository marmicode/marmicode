export interface Skill {
  id: string;
  label: string;
  /* @todo make this mandatory. */
  slug?: string;
  /* @todo make this mandatory. */
  topicId?: string;
}

export function createSkill(skill: Skill) {
  return { ...skill };
}
