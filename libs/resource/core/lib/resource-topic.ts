export type ResourceTopic =
  | 'testing'
  | 'angular'
  | 'signals'
  | 'rxjs'
  | 'architecture'
  | 'practices';

/**
 * In display order: the topic filter and the tags on each row use it.
 */
export const RESOURCE_TOPICS: Array<{ value: ResourceTopic; label: string }> = [
  { value: 'testing', label: 'Testing' },
  { value: 'angular', label: 'Angular' },
  { value: 'signals', label: 'Signals' },
  { value: 'rxjs', label: 'RxJS' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'practices', label: 'Team practices' },
];

/**
 * Topics of each Contentful skill, by slug.
 * Skills that fit no topic are left out.
 */
const SKILL_TOPICS: Record<string, ResourceTopic[]> = {
  /* Testing */
  'angular-aot-testing': ['testing', 'angular'],
  'angular-cypress-component-testing': ['testing', 'angular'],
  'angular-testing-basics': ['testing', 'angular'],
  'cypress-basics': ['testing'],
  jasmine: ['testing'],
  jest: ['testing'],
  'mocking-angular-services': ['testing', 'angular'],

  /* Signals */
  'angular-signals': ['signals', 'angular'],
  'angular-signals-error-management': ['signals', 'rxjs', 'angular'],
  'custom-render-strategies': ['angular'],

  /* RxJS */
  'propagating-http-request-cancelation': ['rxjs'],
  'rxjs-basics': ['rxjs'],
  'rxjs-teardown-propagation': ['rxjs'],

  /* Architecture */
  'angular-dependency-injection': ['architecture', 'angular'],
  'angular-injection-functions': ['architecture', 'angular'],
  'angular-lazy-loading': ['architecture', 'angular'],
  'angular-private-services': ['architecture', 'angular'],
  scam: ['architecture', 'angular'],
  'versatile-angular': ['architecture', 'angular'],

  /* Angular */
  'angular-cli-basics': ['angular'],
  'angular-components': ['angular'],
  'angular-modules': ['angular'],
  'moduleless-angular': ['angular'],

  /* Team practices */
  limbo: ['practices'],
  tcr: ['practices'],
  'timeboxed-tdd': ['practices'],
};

/**
 * Maps Contentful skill slugs to topics. Unknown slugs map to nothing.
 * Result is deduplicated and in `RESOURCE_TOPICS` order.
 */
export function getResourceTopics({
  skillSlugs,
}: {
  skillSlugs: string[];
}): ResourceTopic[] {
  const topics = new Set(
    skillSlugs.flatMap((slug) => SKILL_TOPICS[slug] ?? []),
  );
  return RESOURCE_TOPICS.map(({ value }) => value).filter((topic) =>
    topics.has(topic),
  );
}
