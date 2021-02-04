import { lexer, Token, Tokens } from 'marked';

export type MarkdownToken = (
  | Token
  /* @todo @hack remove this hack once
   * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/50508 is merged */
  | {
      type: 'list';
      raw: string;
      ordered: boolean;
      start: boolean;
      loose: boolean;
      items: MarkdownTokens.ListItem[];
    }
) & /* @todo remove this hack once the typing is fixed.
 * Cf. https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48891 */ {
  tokens?: MarkdownToken[];
};

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
  HorizontalRule = 'hr',
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

export function getMarkdownLinks(tokens: MarkdownToken[]): string[] {
  return tokens
    .map((token) => {
      if (_isMarkdownTokenLink(token)) {
        return [token.href];
      }

      if (_isMarkdownTokenList(token)) {
        return getMarkdownLinks(token.items);
      }

      if ('tokens' in token) {
        return getMarkdownLinks(token.tokens);
      }

      return [];
    })
    .reduce((acc, links) => [...acc, ...links], []);
}

export function _isMarkdownTokenList(
  token: MarkdownToken
): token is MarkdownTokens.List {
  return getMarkdownTokenType(token) === MarkdownTokenType.List;
}

export function _isMarkdownTokenLink(
  token: MarkdownToken
): token is MarkdownTokens.Link {
  return getMarkdownTokenType(token) === MarkdownTokenType.Link;
}
