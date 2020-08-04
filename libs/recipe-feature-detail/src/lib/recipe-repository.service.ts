import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum BlockType {
  Code = 'code',
  Text = 'text',
}

export interface CodeBlock {
  type: BlockType.Code;
  code: string;
}

export interface TextBlock {
  type: BlockType.Text;
  text: string;
}

export type RecipeBlock = CodeBlock | TextBlock;

export interface RecipeFrame {
  duration: number;
  blocks: RecipeBlock[];
}

export interface Recipe {
  id: string;
  slug: string;
  frames: RecipeFrame[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  getRecipe(): Observable<Recipe> {
    return of(null);
  }
}
