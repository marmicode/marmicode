import { Block } from '../block/block';

export interface Frame {
  slug: string;
  duration: number;
  title: string;
  blocks: Block[];
}

export function createFrame(frame: Frame): Frame {
  return { ...frame };
}
