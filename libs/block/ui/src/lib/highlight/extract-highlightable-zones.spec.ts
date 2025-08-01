import { describe, expect, it } from '@jest/globals';
import { Block, BlockType, parseMarkdown } from '@marmicode/block/core';
import { extractHighlightableZones } from './extract-highlightable-zones';

describe('extractHighlightableZones', () => {
  it('should extract highlight info from markdown block', () => {
    const blocks: Block[] = [
      {
        type: BlockType.Markdown,
        tokens:
          parseMarkdown(`Before setting up request validation, we can see that:
- [the farm detail \`GET /farms/{farmId}\` route is accessible](highlight://2) even though it's not defined in the OpenAPI Specification,
- [we can send data in any format](highlight://5) and not only \`application/json\` as described in the OpenAPI Specification,
- [we can send any data](highlight://5,8-10) when creating a farm using the \`POST /farms\` route.
- This is [another link highlighting the first zone](highlight://2)`),
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
    -d \\'{"name": 123, "random": "data"}\\'`,
        language: 'shell',
      },
    ];

    expect(extractHighlightableZones(blocks)).toEqual([
      {
        color: 'blueviolet',
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
        color: 'darkcyan',
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
    ]);
  });

  it('should not fail if no link', () => {
    expect(
      extractHighlightableZones([
        {
          type: BlockType.Markdown,
          tokens: parseMarkdown('text'),
        },
      ]),
    ).toEqual([]);
  });
});
