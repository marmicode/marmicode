import { Cohort } from '@marmicode/cohort/core';
import {
  cohortRouterHelper,
  externalLinks,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';
import { TrainingPreviewData, TrainingTileData } from '@marmicode/training/ui';
import { getUpcomingSessions, Workshop } from '@marmicode/workshop/core';
import {
  formatSessionDates,
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

export function cohortToPreview(cohort: Cohort): TrainingTileData {
  const weekCount = cohort.schedule.weeks.length;
  const labels = WEEK_LABELS[cohort.language];
  return {
    id: cohort.id,
    format: 'cohort',
    language: cohort.language,
    languages: [cohort.language],
    title: cohort.shortTitle,
    subheading: cohort.subheading,
    thumbnailUri: cohort.pictureUri,
    pictureAltText: cohort.pictureAltText,
    duration: `${weekCount} ${weekCount === 1 ? labels.week : labels.weeks}`,
    price: cohort.offer.price,
    ...(cohort.offer.type === 'early-bird'
      ? {
          badge: OFFER_LABELS[cohort.language].earlyBird,
          originalPrice: cohort.offer.originalPrice,
        }
      : {}),
    link: { route: cohortRouterHelper.detail(cohort.id) },
  };
}

export function workshopToPreview(
  workshop: Workshop,
  { today }: { today?: Date } = {},
): TrainingTileData {
  const labels = WORKSHOP_SHARED_LABELS[workshop.language];
  const [nextSession] = today
    ? getUpcomingSessions({ workshops: [workshop], today })
    : [];
  return {
    id: workshop.id,
    format: 'workshop',
    language: workshop.language,
    languages: sortLanguages([
      workshop.language,
      ...(workshop.alternates ?? []).map((alternate) => alternate.language),
    ]),
    title: workshop.shortTitle,
    subheading: workshop.subheading,
    thumbnailUri: workshop.thumbnailUri,
    pictureAltText: workshop.pictureAltText,
    duration: `${workshop.duration} ${workshop.duration === 1 ? labels.day : labels.days}`,
    price: workshop.offer.price,
    ...(nextSession
      ? {
          nextSessionDates: formatSessionDates({
            session: nextSession.session,
            language: workshop.language,
            short: true,
          }),
        }
      : {}),
    link: { route: workshopRouterHelper.detail(workshop.id) },
    viewTransitionName: workshopViewTransitionName(workshop),
  };
}

/**
 * One training, offered in one or more languages.
 * `versions` is never empty.
 *
 * @deprecated 🚧 work in progress
 */
export interface TrainingOffer {
  format: TrainingFormat;
  versions: TrainingTileData[];
}

/**
 * Groups language versions with `Workshop.alternates`, keeping repository order.
 * The cohort and the video course become single-version offers.
 * `today` picks each version's next session.
 *
 * @deprecated 🚧 work in progress
 */
export function toTrainingOffers({
  cohorts,
  workshops,
  today,
}: {
  cohorts: Cohort[];
  workshops: Workshop[];
  videoCourses: TrainingTileData[];
  today: Date;
}): TrainingOffer[] {
  const workshopsById = new Map(
    workshops.map((workshop) => [workshop.id, workshop]),
  );
  const groupedIds = new Set<string>();
  const workshopOffers: TrainingOffer[] = [];
  for (const workshop of workshops) {
    if (groupedIds.has(workshop.id)) {
      continue;
    }
    const group = [
      workshop,
      ...(workshop.alternates ?? []).flatMap((alternate) => {
        const alternateWorkshop = workshopsById.get(alternate.id);
        return alternateWorkshop ? [alternateWorkshop] : [];
      }),
    ];
    group.forEach(({ id }) => groupedIds.add(id));
    workshopOffers.push({
      format: 'workshop',
      versions: group.map((version) => workshopToPreview(version, { today })),
    });
  }
  return [
    ...cohorts.map(
      (cohort): TrainingOffer => ({
        format: 'cohort',
        versions: [cohortToPreview(cohort)],
      }),
    ),
    ...workshopOffers,
  ];
}

/**
 * `null` language: the English version, else the first one.
 * Returns `null` when the offer isn't available in `language`.
 */
export function pickVersion({
  offer,
  language,
}: {
  offer: TrainingOffer;
  language: TrainingLanguage | null;
}): TrainingTileData | null {
  if (language == null) {
    return (
      offer.versions.find((version) => version.language === 'en') ??
      offer.versions[0]
    );
  }
  return (
    offer.versions.find((version) => version.language === language) ?? null
  );
}

const TRAINING_LANGUAGES: TrainingLanguage[] = ['en', 'fr'];

/**
 * English first, without duplicates.
 */
function sortLanguages(languages: TrainingLanguage[]): TrainingLanguage[] {
  return TRAINING_LANGUAGES.filter((language) => languages.includes(language));
}

const OFFER_LABELS: Record<TrainingLanguage, { earlyBird: string }> = {
  en: { earlyBird: 'Early bird' },
  fr: { earlyBird: 'Early bird' },
};

const WEEK_LABELS: Record<TrainingLanguage, { week: string; weeks: string }> = {
  en: { week: 'Week', weeks: 'Weeks' },
  fr: { week: 'Semaine', weeks: 'Semaines' },
};
