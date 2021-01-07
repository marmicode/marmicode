import {
  Block,
  BlockType,
  CodeBlock,
  createCodeBlock,
  getMarkdownTokenType,
  MarkdownBlock,
  parseMarkdown,
} from '@marmicode/frame-api';
import {
  createMarkdownBlock,
  MarkdownToken,
  MarkdownTokens,
  MarkdownTokenType,
} from '@marmicode/frame-core';

export interface BlockGroup {
  blocks: Block[];
}

export function createBlockGroup(blockGroup: BlockGroup): BlockGroup {
  return { ...blockGroup };
}

export function isCodeToken(
  token: MarkdownToken
): token is MarkdownTokens.Code {
  return getMarkdownTokenType(token) === MarkdownTokenType.Code;
}

export function isHeadingToken(
  token: MarkdownToken
): token is MarkdownTokens.Heading {
  return getMarkdownTokenType(token) === MarkdownTokenType.Heading;
}

export function markdownToFrameBlockGroups(text: string): BlockGroup[] {
  const tokens = parseMarkdown(text);
  return tokens.reduce((blockGroups, token) => {
    /*
     * This will create or extend the given block group by:
     * - create a code block if the token is a code token,
     * - create a markdown block if the last block is not markdown,
     * - extend the last markdown block otherwise
     */
    function createOrExtendBlockGroup(blockGroup?: BlockGroup) {
      const blocks = blockGroup?.blocks ?? [];

      /* Create a new code block. */
      if (isCodeToken(token)) {
        return createBlockGroup({
          blocks: [
            ...blocks,
            createCodeBlock({
              code: token.text,
              language: token.lang,
            }),
          ],
        });
      }

      const lastBlock = blocks[blocks.length - 1];

      /* Create a markdown block if the last block is not markdown. */
      if (lastBlock?.type !== BlockType.Markdown) {
        return createBlockGroup({
          blocks: [
            ...blocks,
            createMarkdownBlock({
              tokens: [token],
            }),
          ],
        });
      }

      /* Extend the last markdown block otherwise. */
      return createBlockGroup({
        blocks: [
          ...blocks.slice(0, blocks.length - 1),
          createMarkdownBlock({
            tokens: [...lastBlock.tokens, token],
          }),
        ],
      });
    }

    /* This is a block group breaker, create new block group. */
    if (isHeadingToken(token)) {
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
    expect(frameBlocksList[0]).toEqual(
      like({
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
          } as Partial<MarkdownBlock>),
        ],
      })
    );

    /* Chapter A. */
    expect(frameBlocksList[1]).toEqual(
      like({
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
          } as Partial<MarkdownBlock>),
          like({
            language: 'javascript',
            code: 'Code A',
          } as Partial<CodeBlock>),
        ],
      })
    );

    /* Chapter B. */
    expect(frameBlocksList[2]).toEqual(
      like({
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
          } as Partial<MarkdownBlock>),
        ],
      })
    );

    /* Chapter C. */
    expect(frameBlocksList[3]).toEqual(
      like({
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
      })
    );
  });
});
