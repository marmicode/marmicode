/**
 * Where a newsletter subscriber signed up.
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
 * The value of the subscriber's Mailchimp `Context` field,
 * e.g. "website:home" or "website:workshop:charted-coding-fr".
 */
export function formatNewsletterContext({
  source,
  sourceId,
}: {
  source: NewsletterSource;
  sourceId?: string;
}): string {
  return ['website', source, sourceId].filter(Boolean).join(':');
}
