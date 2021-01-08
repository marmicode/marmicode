import { Block } from './block';

export interface BlockGroup {
  blocks: Block[];
}

export function createBlockGroup(blockGroup: BlockGroup) {
  return { ...blockGroup };
}
