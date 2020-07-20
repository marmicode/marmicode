export interface Skill {
  id: string;
  label: string;
  topicId: string;
}

export function createSkill(skill: Skill) {
  return { ...skill };
}
