import { parseLinesHref } from './text-block-link.component';

describe('parseLinesHref', () => {
  it('should return highlight sections', () => {
    expect(parseLinesHref('lines://1,3-4,5')).toEqual([
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
