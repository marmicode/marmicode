import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TextBlock {
  type: 'text';
}

export type RecipeBlock = TextBlock;

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
  constructor() {}

  getRecipe(): Observable<Recipe> {
    return of(null);
  }
}
