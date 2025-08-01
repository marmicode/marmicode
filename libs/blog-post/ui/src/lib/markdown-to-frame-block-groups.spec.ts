import { describe, expect, it } from '@jest/globals';
import { CodeBlock } from '@marmicode/block/api';
import { markdownToFrameBlockGroups } from './markdown-to-frame-block-groups';

export const like = expect.objectContaining;

describe('markdownToFrames', () => {
  it(`should convert blog post's text to blocks`, () => {
    const markdown = `
Intro.

# Title A

Chapter A.

\`\`\`javascript
Code A
\`\`\`

# Title B

Chapter B.

# Title C

Chapter C before code.

\`\`\`javascript
Code C
\`\`\`

Chapter C after code.
`;

    const frameBlocksList = markdownToFrameBlockGroups(markdown);

    expect(frameBlocksList.length).toEqual(4);

    /* Intro. */
    expect(frameBlocksList[0]).toMatchObject({
      blocks: [
        like({
          tokens: [
            like({
              type: 'paragraph',
            }),
            like({
              type: 'space',
            }),
          ],
        }),
      ],
    });

    /* Chapter A. */
    expect(frameBlocksList[1]).toMatchObject({
      blocks: [
        like({
          tokens: [
            like({
              type: 'heading',
            }),
            like({
              type: 'paragraph',
            }),
            like({
              type: 'space',
            }),
          ],
        }),
        like({
          language: 'javascript',
          code: 'Code A',
        } as Partial<CodeBlock>),
      ],
    });

    /* Chapter B. */
    expect(frameBlocksList[2]).toMatchObject({
      blocks: [
        like({
          tokens: [
            like({
              type: 'heading',
            }),
            like({
              type: 'paragraph',
            }),
            like({
              type: 'space',
            }),
          ],
        }),
      ],
    });

    /* Chapter C. */
    expect(frameBlocksList[3]).toMatchObject({
      blocks: [
        like({
          tokens: [
            like({
              type: 'heading',
            }),
            like({
              type: 'paragraph',
            }),
            like({
              type: 'space',
            }),
          ],
        }),
        like({
          language: 'javascript',
          code: 'Code C',
        } as Partial<CodeBlock>),
        like({
          tokens: [
            like({
              type: 'paragraph',
            }),
          ],
        }),
      ],
    });
  });
});
