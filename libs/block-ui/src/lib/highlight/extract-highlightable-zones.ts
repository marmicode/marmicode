import {
  BlockGroup,
  isMarkdownBlock,
  isTextBlock,
} from '@marmicode/block-core';
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
export function extractHighlightableZones(frame: BlockGroup): HighlightZone[] {
  let links = frame.blocks
    .filter((block) => isTextBlock(block))
    .map((block) => {
      /* @hack this should not be necessary. */
      if (!isTextBlock(block)) {
        throw new Error('Impossible!');
      }

      /* Find all strings between "](" and ")". */
      /* @hack Firefox & Safari don't support lookbehind and lookahead
       * producing "invalid group name error" so let's strip the string
       * afterwards instead of using a regex like "/(?<=\]\().+(?=\))/g". */
      return (block.text.match(/\]\([^)]+\)/g) ?? []).map((link) =>
        link.replace(/^\]\(|\)/g, '')
      );
    })
    .reduce((acc, _links) => [...acc, ..._links], []);

  links = [
    ...links,
    ...frame.blocks
      .filter((block) => isMarkdownBlock(block))
      .map((block) => {
        return [];
      })
      .reduce((acc, _links) => [...acc, ..._links], []),
  ];

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
