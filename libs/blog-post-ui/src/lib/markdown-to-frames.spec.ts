import { Block, createCodeBlock, createTextBlock } from '@marmicode/frame-api';

export function markdownToBlocks(text: string): Block[] {
  throw new Error('🚧 work in progress!');
}

describe('markdownToBlocks', () => {
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

    const blocks = markdownToBlocks(markdown);

    expect(blocks.length).toEqual(5);
    expect(blocks).toEqual([
      createTextBlock({
        text: `
Intro.

# Title A

Chapter A.
      `,
      }),
      createCodeBlock({
        language: 'javascript',
        code: `code A`,
      }),
      createTextBlock({
        text: `
# Title B

Chapter B.

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
    ]);
  });
});
