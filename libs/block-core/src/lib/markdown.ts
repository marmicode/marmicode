import { lexer, Token, Tokens } from 'marked';

export type MarkdownToken = Token;
export namespace MarkdownTokens {
  export type Code = Tokens.Code;
  export type Codespan = Tokens.Codespan;
  export type Em = Tokens.Em;
  export type Heading = Tokens.Heading;
  export type Image = Tokens.Image;
  export type Link = Tokens.Link;
  export type List = Tokens.List;
  export type ListItem = Tokens.ListItem;
  export type Paragraph = Tokens.Paragraph;
  export type Strong = Tokens.Strong;
  export type Text = Tokens.Text;
}

export enum MarkdownTokenType {
  Code = 'code',
  Codespan = 'codespan',
  Emphasis = 'em',
  Heading = 'heading',
  Image = 'image',
  Link = 'link',
  List = 'list',
  ListItem = 'list_item',
  Paragraph = 'paragraph',
  Space = 'space',
  Strong = 'strong',
  Text = 'text',
}

/**
 * @hack stupid hack because there is a `Tokens.Def` type
 * that doesn't have a type.
 */
export function getMarkdownTokenType(token: MarkdownToken) {
  return 'type' in token ? token.type : null;
}

export function parseMarkdown(text: string): MarkdownToken[] {
  return lexer(text);
}

/**
 * @deprecated 🚧 Work in progress.
 */
export function getMarkdownLinks(tokens: MarkdownToken[]): string[] {
  return tokens
    .map((token) => {
      if (_isMarkdownTokenLink(token)) {
        return [token.href];
      }

      // if ('tokens' in token) {
      //   return getMarkdownLinks(token.tokens);
      // }

      return [];
    })
    .reduce((acc, links) => [...acc, ...links], []);
}

export function _isMarkdownTokenLink(
  token: MarkdownToken
): token is MarkdownTokens.Link {
  return getMarkdownTokenType(token) === MarkdownTokenType.Link;
}
