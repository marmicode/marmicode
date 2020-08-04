import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Block, BlockType } from './block/block';

export interface RecipeFrame {
  duration: number;
  title: string;
  blocks: Block[];
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
    return of({
      id: null,
      slug: 'setup-express-gateway',
      title: 'Setup Express Gateway',
      frames: [
        {
          title: 'Install express gateway',
          duration: 1,
          blocks: [
            {
              type: BlockType.Text,
              text: `
# Setup the gateway
## Install the thingy
\`\`\`sh
yarn add express-gateway
\`\`\`

## Let's do it
asjdfkashjdf
a asdklfhjasjkdlfhadshfjkas a
sdf adsk fhjadsklfhj a
              `,
            },
            {
              type: BlockType.Code,
              language: 'typescript',
              code: `const plugins = {
  test: 2
};`,
            },
          ],
        },
        {
          title: 'Install express gateway',
          duration: 1,
          blocks: [
            {
              type: BlockType.Text,
              text: `
# Setup the gateway
## Install the thingy
\`\`\`sh
yarn add express-gateway
\`\`\`

## Let's do it
asjdfkashjdf
a asdklfhjasjkdlfhadshfjkas a
sdf adsk fhjadsklfhj a
              `,
            },
          ],
        },
        {
          title: 'Install express gateway',
          duration: 1,
          blocks: [
            {
              type: BlockType.Text,
              text: `
              
              
# Setup the gateway
## Install the thingy
\`\`\`sh
yarn add express-gateway
\`\`\`

## Let's do it
asjdfkashjdf
a asdklfhjasjkdlfhadshfjkas a
sdf adsk fhjadsklfhj a
              `,
            },
            {
              type: BlockType.Code,
              language: 'typescript',
              code: `const plugins = {
  test: 2
};`,
            },
          ],
        },
      ],
    });
  }
}
