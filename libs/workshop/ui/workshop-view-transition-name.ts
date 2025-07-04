import { Workshop } from '@marmicode/workshop/core';

export function workshopViewTransitionName(workshop: Workshop) {
  return `workshop-${workshop.id}`;
}
