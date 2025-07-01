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
} from '@marmicode/contentful-infra';
import { ResourceType } from '@marmicode/resource-api';

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
        map(
          ({ data }) =>
            (data.resourceCollection.items[0].content as ContentfulRecipe)
              .frameCollection.items[0].slug,
        ),
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
          const resource = data.resourceCollection.items[0];
          return createRecipe({
            id: resource.sys.id,
            slug: resource.slug,
            title: resource.title,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: resource.resourceType as any,
            frames: (
              resource.content as ContentfulRecipe
            ).frameCollection.items.map((frame) =>
              createFrame({
                blocks: frame.blockCollection.items.map((block) => {
                  switch (block.__typename) {
                    case 'CodeBlock':
                      return createCodeBlock({
                        code: block.code,
                        language: block.language,
                      });
                    case 'TextBlock':
                      return createTextBlock({
                        text: block.text,
                      });
                    default:
                      return null;
                  }
                }),
                duration: frame.duration,
                slug: frame.slug,
                title: frame.title,
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
