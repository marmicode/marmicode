import { inject, Injectable, NgModule } from '@angular/core';
import {
  BlockGroup,
  createCodeBlock,
  createTextBlock,
} from '@marmicode/block/api';
import {
  ContentfulClient,
  provideContentfulClient,
  Query,
  Recipe as ContentfulRecipe,
} from '@marmicode/contentful/infra';
import { ResourceType } from '@marmicode/resource/api';

import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type RecipeType = ResourceType.Recipe | ResourceType.Tutorial;

export interface Frame extends BlockGroup {
  slug: string;
  duration: number;
  title: string;
}

export function createFrame(frame: Frame): Frame {
  return { ...frame };
}

export interface Recipe {
  id: string;
  type: RecipeType;
  title: string;
  slug: string;
  frames: Frame[];
}

export function createRecipe(recipe: Recipe): Recipe {
  return { ...recipe };
}

const getRecipeFirstFrameSlug = gql`
  query getRecipeFirstFrameSlug($recipeSlug: String!) {
    resourceCollection(limit: 1, where: { slug: $recipeSlug }) {
      items {
        content {
          ... on Recipe {
            frameCollection(limit: 1) {
              items {
                slug
              }
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
          ... on Recipe {
            frameCollection {
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
  }
`;

@Injectable()
export class RecipeRepository {
  private _contentfulClient = inject(ContentfulClient);

  getRecipeFirstFrameSlug(recipeSlug: string): Observable<string> {
    return this._contentfulClient
      .query<Query>({
        query: getRecipeFirstFrameSlug,
        variables: {
          recipeSlug,
        },
      })
      .pipe(
        map(({ data }) => {
          if (!data?.resourceCollection?.items) throw new Error('Recipe not found');
          const resource = data.resourceCollection.items[0];
          if (!resource) throw new Error('Recipe not found');
          const content = resource.content as ContentfulRecipe | null;
          const firstFrame = content?.frameCollection?.items?.[0];
          if (!firstFrame) throw new Error('Recipe has no frames');
          return firstFrame.slug ?? '';
        }),
      );
  }

  getRecipe(recipeSlug: string): Observable<Recipe> {
    return this._contentfulClient
      .query<Query>({
        query: getRecipe,
        variables: {
          recipeSlug,
        },
      })
      .pipe(
        map(({ data }) => {
          if (!data?.resourceCollection?.items) throw new Error('Recipe not found');
          const resource = data.resourceCollection.items[0];
          if (!resource) throw new Error('Recipe not found');
          const content = resource.content as ContentfulRecipe | null;
          if (!content?.frameCollection?.items) throw new Error('Recipe has no frames');
          return createRecipe({
            id: resource.sys.id,
            slug: resource.slug ?? '',
            title: resource.title ?? '',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: resource.resourceType as any,
            frames: content.frameCollection.items
            .filter((frame): frame is NonNullable<typeof frame> => frame != null)
            .map((frame) =>
              createFrame({
                blocks: (frame.blockCollection?.items ?? [])
                  .filter((block): block is NonNullable<typeof block> => block != null)
                  .map((block) => {
                    if (block.__typename === 'CodeBlock') {
                      return createCodeBlock({
                        code: (block as { code?: string }).code ?? '',
                        language: (block as { language?: string }).language ?? '',
                      });
                    }
                    if (block.__typename === 'TextBlock') {
                      return createTextBlock({
                        text: (block as { text?: string }).text ?? '',
                      });
                    }
                    return null;
                  })
                  .filter((b): b is NonNullable<typeof b> => b != null) as BlockGroup['blocks'],
                duration: frame.duration ?? 0,
                slug: frame.slug ?? '',
                title: frame.title ?? '',
              }),
            ),
          });
        }),
      );
  }
}

@NgModule({
  providers: [RecipeRepository, provideContentfulClient()],
})
export class RecipeRepositoryModule {}
