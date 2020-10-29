import {
  BlockType,
  createFrame,
  createTextBlock,
} from '@marmicode/recipe-core';
import { extractHighlightInfo } from './extract-highlight-info';

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

  it('should not fail if no link', () => {
    expect(
      extractHighlightInfo(
        createFrame({
          slug: 'test',
          duration: 1,
          title: 'test',
          blocks: [
            createTextBlock({
              text: 'test',
            }),
          ],
        })
      )
    ).toEqual({ zones: [] });
  });
});