import {
  Block,
  BlockType,
  MarkdownToken,
  MarkdownTokens,
  MarkdownTokenType,
  createCodeBlock,
  createMarkdownBlock,
  getMarkdownTokenType,
  parseMarkdown,
} from 'libs/block/api';

export interface BlockGroup {
  blocks: Block[];
}

export function createBlockGroup(blockGroup: BlockGroup): BlockGroup {
  return { ...blockGroup };
}

export function isCodeToken(
  token: MarkdownToken,
): token is MarkdownTokens.Code {
  return getMarkdownTokenType(token) === MarkdownTokenType.Code;
}

export function isHeadingToken(
  token: MarkdownToken,
): token is MarkdownTokens.Heading {
  return getMarkdownTokenType(token) === MarkdownTokenType.Heading;
}

/**
 * This function will parse & split a blog post's markdown text into
 * different block groups.
 * Each block group may contain different blocks like markdown or code.
 *
 * This might sound tricky but the main goal is to split a blog post
 * into groups that serve as a context for code highlight links.
 * So a `highlight://` link will automatically highlight the code from
 * the same section.
 */
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
