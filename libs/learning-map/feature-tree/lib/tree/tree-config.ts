export interface TreeNode {
  id: string;
  name: string;
  x: number;
  y: number;
  linkWith?: string[];
}

export interface TreeConfig {
  height?: number;
  width: number;
  nodes: TreeNode[];
}
