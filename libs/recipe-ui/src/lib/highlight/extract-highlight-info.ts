import { Frame, isTextBlock } from '@marmicode/recipe-core';
import {
  createHighlightInfo,
  createHighlightZone,
  HighlightInfo,
} from './highlight-info';
import { isHighlightLink, parseHighlightLink } from './parse-highlight-link';

const availableColors = ['purple', 'green', 'orange', 'blue', 'yellow'];

export function extractHighlightInfo(frame: Frame): HighlightInfo {
  const zones = frame.blocks
    .filter((block) => isTextBlock(block))
    .map((block) => {
      /* @hack this should not be necessary. */
      if (!isTextBlock(block)) {
        throw new Error('Impossible!');
      }

      /* Find all strings between "](" and ")". */
      const links = block.text.match(/(?<=\]\().+(?=\))/g) ?? [];

      /* Get highlight sections for each link. */
      const highlightSectionsList = links
        .filter((link) => isHighlightLink(link))
        .map((link) => parseHighlightLink(link));

      return highlightSectionsList.map((sections, index) => {
        return createHighlightZone({
          color: availableColors[index % availableColors.length],
          sections,
        });
      });
    })
    .reduce((acc, _zones) => [...acc, ..._zones], []);
  return createHighlightInfo({
    zones,
  });
}
