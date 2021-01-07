import { lexer, Token } from 'marked';

export type MarkdownToken = Token;

export function parseMarkdown(text: string): MarkdownToken[] {
  return lexer(text);
}
