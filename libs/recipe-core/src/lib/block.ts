export enum BlockType {
  Code = 'code',
  Picture = 'picture',
  Text = 'text',
}

export interface CodeBlock {
  type: BlockType.Code;
  language: string;
  code: string;
}

export function createCodeBlock(block: Omit<CodeBlock, 'type'>): CodeBlock {
  return { type: BlockType.Code, ...block };
}

export interface TextBlock {
  type: BlockType.Text;
  text: string;
}

export function createTextBlock(block: Omit<TextBlock, 'type'>): TextBlock {
  return { type: BlockType.Text, ...block };
}

export type Block = CodeBlock | TextBlock;
