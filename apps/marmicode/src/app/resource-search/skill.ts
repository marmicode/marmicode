export interface Skill {
  id: string;
  label: string;
}

export function createSkill(skill: Skill) {
  return skill;
}
