import {
  Block,
  CodeBlock,
  MarkdownBlock,
  parseMarkdown,
} from '@marmicode/frame-api';

export function markdownToFrameBlocksList(text: string): Block[][] {
  const tokens = parseMarkdown(text);
  return tokens.reduce((blocks) => {
    return blocks;
  }, [] as Block[][]);
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

    const frameBlocksList = markdownToFrameBlocksList(markdown);

    expect(frameBlocksList.length).toEqual(4);
    expect(frameBlocksList).toEqual([
      /* Intro frame.*/
      like([
        like({
          tokens: [
            like({
              type: 'paragraph',
            }),
          ],
        } as Partial<MarkdownBlock>),
      ]),

      /* Chapter A. */
      like([
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
      ]),

      /* Chapter B. */
      like([
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
      ]),

      /* Chapter C. */
      like([
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
      ]),
    ]);
  });
});
