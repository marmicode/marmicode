import { BlockType, createFrame, Frame } from '@marmicode/recipe-core';
import { isTextBlock } from '@marmicode/recipe-core';
import {
  createHighlightInfo,
  createHighlightZone,
  HighlightInfo,
} from './highlight-info';
import { isHighlightLink, parseHighlightLink } from './parse-highlight-link';

const availableColors = ['purple', 'green', 'orange', 'blue', 'yellow'];

function extractHighlightInfo(frame: Frame): HighlightInfo {
  const zones = frame.blocks
    .filter((block) => isTextBlock(block))
    .map((block) => {
      if (!isTextBlock(block)) {
        throw new Error();
      }

      /* Find all strings between "](" and ")". */
      const links = block.text.match(/(?<=\]\().+(?=\))/g);

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

describe('extractHighlightInfo', () => {
  it('should extract highlight info from frame', () => {
    const frame = createFrame({
      blocks: [
        {
          type: BlockType.Text,
          text: `Before setting up request validation, we can see that:
- [the farm detail \`GET /farms/{farmId}\` route is accessible even though it's not defined in the OpenAPI Specification](highlight://2),
- [we can send data in any format and not only \`application/json\` as described in the OpenAPI Specification](highlight://5),
- [we can send any data when creating a farm using the \`POST /farms\` route.](highlight://5,8-10)`,
        },
        {
          type: BlockType.Code,
          code: `# Get a farm.
curl http://localhost:8080/farms/P4VU2Xsw

# Create a farm with urlencoded data
curl http://localhost:8080/farms -d"name=springfield"

# Create a farm with invalid data.
curl http://localhost:8080/farms
    -H "Content-Type: application/json"
    -d \'{"name": 123, "random": "data"}\'`,
          language: 'shell',
        },
      ],
      duration: 2,
      slug: 'without-validation',
      title: 'Without validation',
    });

    expect(extractHighlightInfo(frame)).toEqual({
      zones: [
        {
          color: 'purple',
          sections: [
            {
              start: 2,
              end: 2,
            },
          ],
        },
        {
          color: 'green',
          sections: [
            {
              start: 5,
              end: 5,
            },
          ],
        },
        {
          color: 'orange',
          sections: [
            {
              start: 5,
              end: 5,
            },
            {
              start: 8,
              end: 10,
            },
          ],
        },
      ],
    });
  });
});
