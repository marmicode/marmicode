export interface Skill {
  id: string;
  label: string;
  /**
   * @deprecated 🚧 Work in progress.
   */
  topicId?: string;
}

export function createSkill(skill: Skill) {
  return { ...skill };
}
