import { createHighlightSection, HighlightSection } from '../highlight-info';

function parseLinesHref(href: string): HighlightSection[] {
  const expression = href.split('lines://')[1];

  /* Split blocks to ['1', '3-4', '5']. */
  const blocks = expression.split(',');
  return blocks.map((block) => {
    /* Parse start and end. */
    const [startRaw, endRaw] = block.split('-');
    const start = parseInt(startRaw, 10);

    /* If end is not defined, use start. */
    const end = endRaw ? parseInt(endRaw, 10) : start;
    return createHighlightSection({
      start,
      end,
    });
  });
}

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
