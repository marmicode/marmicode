import { Cohort } from '@marmicode/cohort/core';
import {
  cohortRouterHelper,
  externalLinks,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { TrainingPreviewData } from '@marmicode/training/ui';
import { Workshop } from '@marmicode/workshop/core';
import {
  WORKSHOP_SHARED_LABELS,
  workshopViewTransitionName,
} from '@marmicode/workshop/ui';
/* @todo replace with the video course's own picture: this is the workshop one. */
import pragmaticAngularTestingVideoCourseThumbnailUri from './pragmatic-angular-testing-video-course.webp';

/**
 * The video course lives on courses.marmicode.io, so it only has a preview here.
 */
export const PRAGMATIC_ANGULAR_TESTING_VIDEO_COURSE: TrainingPreviewData = {
  id: 'pragmatic-angular-testing-video-course',
  format: 'video-course',
  language: 'en',
  title: 'Pragmatic Angular Testing',
  subheading: `Learn Angular testing at your own pace.
53 lessons with exercises, a tutor and solutions.`,
  thumbnailUri: pragmaticAngularTestingVideoCourseThumbnailUri.replace(
    /^\.\//,
    '/',
  ),
  pictureAltText:
    'Younes in apron holding a purple cooking pot overflowing with Angular, Vitest, Playwright, and Testronaut logos in a kitchen setting.',
  duration: '4.5 Hours',
  price: 120,
  link: { href: externalLinks.pragmaticAngularTestingCourseUrl },
};

export function cohortToPreview(cohort: Cohort): TrainingPreviewData {
  const weekCount = cohort.schedule.weeks.length;
  return {
    id: cohort.id,
    format: 'cohort',
    language: cohort.language,
    title: cohort.shortTitle,
    subheading: cohort.subheading,
    thumbnailUri: cohort.pictureUri,
    pictureAltText: cohort.pictureAltText,
    duration: `${weekCount} Weeks`,
    price: cohort.offer.price,
    link: { route: cohortRouterHelper.detail(cohort.id) },
  };
}

export function workshopToPreview(workshop: Workshop): TrainingPreviewData {
  const labels = WORKSHOP_SHARED_LABELS[workshop.language];
  return {
    id: workshop.id,
    format: 'workshop',
    language: workshop.language,
    title: workshop.shortTitle,
    subheading: workshop.subheading,
    thumbnailUri: workshop.thumbnailUri,
    pictureAltText: workshop.pictureAltText,
    duration: `${workshop.duration} ${workshop.duration === 1 ? labels.day : labels.days}`,
    price: workshop.offer.price,
    link: { route: workshopRouterHelper.detail(workshop.id) },
    viewTransitionName: workshopViewTransitionName(workshop),
  };
}
