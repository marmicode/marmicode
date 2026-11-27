import { describe, expect, it } from 'vitest';
import { getResourceTopics } from './resource-topic';

describe(getResourceTopics.name, () => {
  it.todo('maps skills to ordered, unique topics', () => {
    const rxjsSlug = 'rxjs-basics';
    const signalsSlug = 'angular-signals';

    const topics = getResourceTopics({
      skillSlugs: [rxjsSlug, signalsSlug, signalsSlug],
    });

    expect(topics).toEqual(['angular', 'signals', 'rxjs']);
  });

  it.todo('ignores unknown skills', () => {
    // Call `getResourceTopics` with `['unknown-skill']` and assert `[]`.
  });
});
