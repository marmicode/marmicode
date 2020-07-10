export interface TreeNode {
  id: string;
  name: string;
  value: number;
  fixed: boolean;
  x: number;
  y: number;
  linkWith?: string[];
}
