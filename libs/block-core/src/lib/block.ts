import { MarkdownToken } from './markdown';

export enum BlockType {
  Code = 'code',
  Markdown = 'markdown',
  Picture = 'picture',
  Text = 'text',
}

export interface CodeBlock {
  type: BlockType.Code;
  language: string;
  code: string;
}

export function createCodeBlock(block: Omit<CodeBlock, 'type'>): CodeBlock {
  return { ...block, type: BlockType.Code };
}

export interface TextBlock {
  type: BlockType.Text;
  text: string;
}

export function createTextBlock(block: Omit<TextBlock, 'type'>): TextBlock {
  return { ...block, type: BlockType.Text };
}

export function isTextBlock(block: Block): block is TextBlock {
  return block.type === BlockType.Text;
}

export interface MarkdownBlock {
  type: BlockType.Markdown;
  tokens: MarkdownToken[];
}

export function createMarkdownBlock(
  block: Omit<MarkdownBlock, 'type'>
): MarkdownBlock {
  return { ...block, type: BlockType.Markdown };
}

export type Block = CodeBlock | MarkdownBlock | TextBlock;
