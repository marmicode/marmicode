import { describe, it } from 'vitest';
import { getResourceTopics } from './resource-topic';

describe(getResourceTopics.name, () => {
  it.todo('maps skills to ordered, unique topics', () => {
    // Pick from the map an RxJS skill slug and a signals skill slug that also maps to Angular.
    // Call `getResourceTopics` with `[rxjsSlug, signalsSlug, signalsSlug]`.
    // Assert `['angular', 'signals', 'rxjs']` (topic order, no duplicates).
  });

  it.todo('ignores unknown skills', () => {
    // Call `getResourceTopics` with `['unknown-skill']` and assert `[]`.
  });
});
