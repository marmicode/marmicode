import { InjectionToken } from '@angular/core';

/**
 * Where a newsletter subscriber signed up. Each source adds its own Mailchimp tags.
 */
export type NewsletterSource =
  | 'blog'
  | 'coaching'
  | 'cohort'
  | 'home'
  | 'library'
  | 'trainings'
  | 'workshop';

/**
 * Mailchimp tag IDs (not names) sent with each signup, by source.
 * Mailchimp's embedded form only accepts the IDs of existing tags, e.g. `Cookbook` is `10770715`.
 * Sources without IDs subscribe without tags.
 */
export const NEWSLETTER_TAG_IDS = new InjectionToken<
  Record<NewsletterSource, string[]>
>('NEWSLETTER_TAG_IDS', {
  factory: () => ({
    blog: [],
    coaching: [],
    cohort: [],
    home: [],
    library: [],
    trainings: [],
    workshop: [],
  }),
});
