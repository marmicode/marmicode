import { Workshop } from '@marmicode/workshop/core';

export function workshopViewTransitionName(workshop: Workshop | undefined) {
  return workshop ? `workshop-${workshop.id}` : 'workshop-unknown';
}
