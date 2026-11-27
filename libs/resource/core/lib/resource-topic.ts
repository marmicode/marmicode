/**
 * @deprecated 🚧 work in progress
 */
export type ResourceTopic =
  | 'testing'
  | 'angular'
  | 'signals'
  | 'rxjs'
  | 'architecture'
  | 'practices';

/**
 * In display order: the topic filter and the tags on each row use it.
 *
 * @deprecated 🚧 work in progress
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
 * Maps Contentful skill slugs to topics. Unknown slugs map to nothing.
 * Result is deduplicated and in `RESOURCE_TOPICS` order.
 *
 * @deprecated 🚧 work in progress
 */
export function getResourceTopics(_args: {
  skillSlugs: string[];
}): ResourceTopic[] {
  throw new Error('🚧 work in progress');
}
