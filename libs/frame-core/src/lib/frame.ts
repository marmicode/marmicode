import { BlockGroup } from './block-group';

export interface Frame extends BlockGroup {
  slug: string;
  duration: number;
  title: string;
}

export function createFrame(frame: Frame): Frame {
  return { ...frame };
}
