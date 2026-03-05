import { describe, expect, it } from '@jest/globals';
import { parseHighlightLink } from './parse-highlight-link';

describe('parseHighlightLink', () => {
  it('should return highlight sections', () => {
    expect(parseHighlightLink('highlight://1,3-4,5')).toEqual([
      {
        start: 1,
        end: 1,
      },
      {
        start: 3,
        end: 4,
      },
      {
        start: 5,
        end: 5,
      },
    ]);
  });
});
