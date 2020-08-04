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

export interface TextBlock {
  type: BlockType.Text;
  text: string;
}

export interface PictureBlock {
  type: BlockType.Picture;
  url: string;
}

export type Block = CodeBlock | PictureBlock | TextBlock;
