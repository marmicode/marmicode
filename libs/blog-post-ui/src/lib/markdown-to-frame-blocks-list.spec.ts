import {
  Block,
  getMarkdownTokenType,
  parseMarkdown,
} from '@marmicode/frame-api';
import { MarkdownTokenType } from '@marmicode/frame-core';

export interface BlockGroup {
  blocks: Block[];
}

export function createBlockGroup(blockGroup: BlockGroup): BlockGroup {
  return { ...blockGroup };
}

export function markdownToFrameBlockGroups(text: string): BlockGroup[] {
  const tokens = parseMarkdown(text);
  return tokens.reduce((blockGroups, token) => {
    const tokenType = getMarkdownTokenType(token);

    /* This is a block group breaker, create new block group. */
    if (tokenType === MarkdownTokenType.Heading) {
      return [...blockGroups, createBlockGroup({ blocks: [] })];
    }

    /* Append to last block group. */
    const lastBlockGroup =
      blockGroups[blockGroups.length - 1] ?? createBlockGroup({ blocks: [] });
    return [...blockGroups.slice(0, blockGroups.length - 1), lastBlockGroup];
  }, [] as BlockGroup[]);
}

export const like = expect.objectContaining;

describe('markdownToFrames', () => {
  it(`🚧 should convert blog post's text to blocks`, () => {
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

    const frameBlocksList = markdownToFrameBlockGroups(markdown);

    expect(frameBlocksList.length).toEqual(4);
    // expect(frameBlocksList).toEqual([
    //   /* Intro frame.*/
    //   like({
    //     blocks: [
    //       like({
    //         tokens: [
    //           like({
    //             type: 'paragraph',
    //           }),
    //         ],
    //       } as Partial<MarkdownBlock>),
    //     ],
    //   }),
    //
    //   /* Chapter A. */
    //   like({
    //     blocks: [
    //       like({
    //         tokens: [
    //           like({
    //             type: 'header',
    //           }),
    //           like({
    //             type: 'paragraph',
    //           }),
    //         ],
    //       } as Partial<MarkdownBlock>),
    //       like({
    //         language: 'javascript',
    //         code: 'Code A',
    //       } as Partial<CodeBlock>),
    //     ],
    //   }),
    //
    //   /* Chapter B. */
    //   like({
    //     blocks: [
    //       like({
    //         tokens: [
    //           like({
    //             type: 'header',
    //           }),
    //           like({
    //             type: 'paragraph',
    //           }),
    //         ],
    //       } as Partial<MarkdownBlock>),
    //     ],
    //   }),
    //
    //   /* Chapter C. */
    //   like({
    //     blocks: [
    //       like({
    //         tokens: [
    //           like({
    //             type: 'header',
    //           }),
    //           like({
    //             type: 'paragraph',
    //           }),
    //         ],
    //       } as Partial<MarkdownBlock>),
    //       like({
    //         language: 'javascript',
    //         code: 'Code C',
    //       } as Partial<CodeBlock>),
    //       like({
    //         tokens: [
    //           like({
    //             type: 'paragraph',
    //           }),
    //         ],
    //       } as Partial<MarkdownBlock>),
    //     ],
    //   }),
    // ]);
  });
});
