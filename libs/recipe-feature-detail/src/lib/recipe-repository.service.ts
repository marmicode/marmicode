import { Injectable, NgModule } from '@angular/core';
import { ContentfulModule, Query } from '@marmicode/contentful-api';
import { ResourceType } from '@marmicode/resource-api';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Block, BlockType } from './block/block';

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

const getRecipe = gql`
  query getRecipe($recipeSlug: String!) {
    resourceCollection(limit: 1, where: { slug: $recipeSlug }) {
      items {
        sys {
          id
        }
        resourceType
        slug
        title
        content {
          frameCollection(limit: 1) {
            items {
              duration
              slug
              title
              blockCollection {
                items {
                  __typename
                  ... on CodeBlock {
                    code
                    language
                  }
                  ... on TextBlock {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

@Injectable()
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

  getRecipe(recipeSlug: string): Observable<Recipe> {
    // @todo wip
    // return this._apollo
    //   .query<Query>({
    //     query: getRecipe,
    //     variables: {
    //       recipeSlug
    //     }
    //   })

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

@NgModule({
  imports: [ContentfulModule],
  providers: [RecipeRepository],
})
export class RecipeRepositoryModule {}
