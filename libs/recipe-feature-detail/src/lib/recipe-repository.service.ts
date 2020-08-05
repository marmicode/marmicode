import { Injectable, NgModule } from '@angular/core';
import { ContentfulModule, Query } from '@marmicode/contentful-api';
import { ResourceType } from '@marmicode/resource-api';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { BlockType, createCodeBlock, createTextBlock } from './block/block';
import { createFrame, Frame } from './frame/frame';

export type RecipeType = ResourceType.Recipe | ResourceType.Tutorial;

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
    return this._apollo
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
            type: resource.resourceType as any,
            frames: resource.content.frameCollection.items.map((frame) =>
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
              })
            ),
          });
        })
      );
  }
}

@NgModule({
  imports: [ContentfulModule],
  providers: [RecipeRepository],
})
export class RecipeRepositoryModule {}
