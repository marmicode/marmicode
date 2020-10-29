import { createHighlightSection, HighlightSection } from './highlight-info';

export const highlightLinkPrefix = 'highlight://';

export function isHighlightLink(link: string): boolean {
  return link.startsWith(highlightLinkPrefix);
}

/**
 * Parses `lines://1,3-4,5`.
 * @returns [{start: 1, end: 1}, {start: 3, end: 4}, ...]
 */
export function parseHighlightLink(link: string): HighlightSection[] {
  const expression = link.split(highlightLinkPrefix)[1];

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
