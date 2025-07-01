export interface Skill {
  id: string;
  label: string;
  slug: string;
}

export function createSkill(skill: Skill): Skill {
  return { ...skill };
}
