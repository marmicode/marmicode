import {
  Block,
  CodeBlock,
  createCodeBlock,
  getMarkdownTokenType,
  MarkdownBlock,
  parseMarkdown,
} from '@marmicode/frame-api';
import { MarkdownTokens, MarkdownTokenType } from '@marmicode/frame-core';

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

    /*
     * This will create or extend the given block group by:
     * - create a code block if the token is a code token,
     * - create a markdown block if the last block is not markdown,
     * - extend the last markdown block otherwise
     */
    function createOrExtendBlockGroup(blockGroup?: BlockGroup) {
      return blockGroup;
    }

    if (tokenType === MarkdownTokenType.Code) {
      const codeToken = token as MarkdownTokens.Code;
      const codeBlock = createCodeBlock({
        language: codeToken.lang,
        code: codeToken.text,
      });
    }

    /* This is a block group breaker, create new block group. */
    if (tokenType === MarkdownTokenType.Heading) {
      return [...blockGroups, createOrExtendBlockGroup()];
    }

    /* Append to last block group.
     * `createOrExtendBlockGroup` will create a new group
     * if `lastBlockGroup` is null. */
    const lastBlockGroup = blockGroups[blockGroups.length - 1];

    return [
      ...blockGroups.slice(0, blockGroups.length - 1),
      createOrExtendBlockGroup(lastBlockGroup),
    ];
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
