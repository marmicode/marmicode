import { Injectable } from '@angular/core';
import { Query } from '@marmicode/contentful-api';
import { ResourceType } from '@marmicode/resource-api';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Block, BlockType } from './block/block';

import * as gql from 'graphql-tag';

export interface RecipeFrame {
  slug: string;
  duration: number;
  title: string;
  blocks: Block[];
}

export interface Recipe {
  id: string;
  type: ResourceType.Recipe | ResourceType.Tutorial;
  title: string;
  slug: string;
  frames: RecipeFrame[];
}

const getRecipeFirstFrameSlug = gql`
  query getRecipeFirstFrameSlug($recipeSlug: String!) {
    resourceCollection(limit: 1, where: { slug: $recipeSlug }) {
      items {
        content {
          frameCollection(limit: 1) {
            items {
              slug
            }
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  constructor(private _apollo: Apollo) {}

  getRecipeFirstFrameSlug(recipeSlug: string): Observable<string> {
    return this._apollo
      .query<Query>({
        query: getRecipeFirstFrameSlug,
        variables: {
          recipeSlug,
        },
      })
      .pipe(
        map(
          ({ data }) =>
            data.resourceCollection.items[0].content.frameCollection.items[0]
              .slug
        )
      );
  }

  getRecipe(): Observable<Recipe> {
    return of({
      id: null,
      type: ResourceType.Tutorial,
      slug: 'setup-express-gateway',
      title: 'Setup Express Gateway',
      frames: [
        {
          slug: 'install-express-gateway-1',
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
              language: 'javascript',
              code: `const plugins = {
  test: 2
};`,
            },
          ],
        },
        {
          slug: 'install-express-gateway-2',
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
          slug: 'install-express-gateway-3',
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
              language: 'javascript',
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
