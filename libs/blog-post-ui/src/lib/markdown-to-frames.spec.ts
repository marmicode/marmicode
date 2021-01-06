import { createCodeBlock, createTextBlock, Frame } from '@marmicode/frame-api';

export function markdownToFrames(text: string): Frame[] {
  throw new Error('🚧 work in progress!');
}

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
      expect.objectContaining({
        blocks: [
          createTextBlock({
            text: `
Intro.
      `,
          }),
        ],
      } as Partial<Frame>),
      expect.objectContaining({
        blocks: [
          createTextBlock({
            text: `
# Title A

Chapter A.
      `,
          }),
          createCodeBlock({
            language: 'javascript',
            code: `code A`,
          }),
        ],
      } as Partial<Frame>),
      expect.objectContaining({
        blocks: [
          createTextBlock({
            text: `
# Title B

Chapter B.
      `,
          }),
        ],
      } as Partial<Frame>),
      expect.objectContaining({
        blocks: [
          createTextBlock({
            text: `
# Title C

Chapter C before code.
        `,
          }),
          createCodeBlock({
            language: 'javascript',
            code: `code C`,
          }),
          createTextBlock({
            text: `
Chapter C after code.
`,
          }),
        ],
      } as Partial<Frame>),
    ]);
  });
});
