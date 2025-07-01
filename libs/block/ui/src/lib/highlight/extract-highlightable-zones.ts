import {
  Block,
  getMarkdownLinks,
  isMarkdownBlock,
} from '@marmicode/block/core';
import { createHighlightZone, HighlightZone } from './highlight-zone';
import { isHighlightLink, parseHighlightLink } from './parse-highlight-link';

const availableColors = [
  'blueviolet',
  'green',
  'darkcyan',
  'blue',
  'chocolate',
  'purple',
  'deeppink',
];

export function extractHighlightableZones(blocks: Block[]): HighlightZone[] {
  const links = blocks
    .filter((block) => isMarkdownBlock(block))
    .map((block) => {
      /* @hack this should not be necessary but it is needed by typescript. */
      if (!isMarkdownBlock(block)) {
        throw new Error('Impossible!');
      }

      return getMarkdownLinks(block.tokens);
    })
    .reduce((acc, _links) => [...acc, ..._links], []);

  const uniqueLinks = Array.from(new Set(links));

  /* Get highlight sections for each link. */
  const highlightSectionsList = uniqueLinks
    .filter((link) => isHighlightLink(link))
    .map((link) => parseHighlightLink(link));

  return highlightSectionsList.map((sections, index) => {
    return createHighlightZone({
      color: availableColors[index % availableColors.length],
      sections,
    });
  });
}
