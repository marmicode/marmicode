import { CodeBlock, Frame, MarkdownBlock } from '@marmicode/frame-api';

export function markdownToFrames(text: string): Frame[] {
  throw new Error('🚧 work in progress!');
}

export const like = expect.objectContaining;

describe('markdownToFrames', () => {
  xit(`🚧 should convert blog post's text to blocks`, () => {
    const markdown = `
Intro.

# Title A

Chapter A.

\`\`\`javascript
code A
\`\`\`

# Title B

Chapter B.

# Title C

Chapter C before code.

\`\`\`javascript
code C
\`\`\`

Chapter C after code.
`;

    const frames = markdownToFrames(markdown);

    expect(frames.length).toEqual(4);
    expect(frames).toEqual([
      /* Intro frame.*/
      like({
        blocks: [
          like({
            tokens: [
              like({
                type: 'paragraph',
              }),
            ],
          } as Partial<MarkdownBlock>),
        ],
      } as Partial<Frame>),

      /* Chapter A. */
      like({
        blocks: [
          like({
            tokens: [
              like({
                type: 'header',
              }),
              like({
                type: 'paragraph',
              }),
            ],
          } as Partial<MarkdownBlock>),
          like({
            language: 'javascript',
            code: 'Code A',
          } as Partial<CodeBlock>),
        ],
      }),

      /* Chapter B. */
      like({
        blocks: [
          like({
            tokens: [
              like({
                type: 'header',
              }),
              like({
                type: 'paragraph',
              }),
            ],
          } as Partial<MarkdownBlock>),
        ],
      }),

      /* Chapter C. */
      like({
        blocks: [
          like({
            tokens: [
              like({
                type: 'header',
              }),
              like({
                type: 'paragraph',
              }),
            ],
          } as Partial<MarkdownBlock>),
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
          } as Partial<MarkdownBlock>),
        ],
      }),
    ]);
  });
});
