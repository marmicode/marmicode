import { inject, Injectable, NgModule } from '@angular/core';
import { BlogPost, createBlogPost } from '@marmicode/blog-post/ui';
import {
  BlogPost as ContentfulBlogPost,
  ContentfulClient,
  provideContentfulClient,
  Query,
  Resource as ContentfulResource,
} from '@marmicode/contentful/infra';
import {
  getResourceKind,
  getResourceLink,
  getResourceTopics,
  RESOURCE_TOPICS,
  ResourceType,
} from '@marmicode/resource/core';
import { ResourceRowData } from '@marmicode/resource/ui';
import { WipService } from '@marmicode/shared/utils';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const getBlogPost = gql`
  query getBlogPost($blogPostSlug: String!) {
    resourceCollection(limit: 1, where: { slug: $blogPostSlug }) {
      items {
        sys {
          id
        }
        author {
          name
          picture {
            url
          }
          twitter
        }
        duration
        picture {
          url
        }
        releasedAt
        summary
        title
        content {
          ... on BlogPost {
            text
          }
        }
      }
    }
  }
`;

export const getLatestResources = gql`
  query getLatestResources($limit: Int!, $filter: ResourceFilter) {
    resourceCollection(
      limit: $limit
      order: [releasedAt_DESC]
      where: $filter
    ) {
      items {
        sys {
          id
        }
        duration
        picture {
          url
        }
        releasedAt
        requiredSkillCollection {
          items {
            slug
          }
        }
        resourceType
        skillCollection {
          items {
            slug
          }
        }
        slug
        summary
        title
        url
      }
    }
  }
`;

@Injectable()
export class BlogPostRepository {
  private _contentfulClient = inject(ContentfulClient);
  private _wip = inject(WipService);

  getBlogPost(blogPostSlug: string): Observable<BlogPost> {
    return this._contentfulClient
      .query<Query>({
        query: getBlogPost,
        variables: {
          blogPostSlug,
        },
      })
      .pipe(
        map(({ data }) => {
          const resource = data!.resourceCollection!.items[0]!;
          return createBlogPost({
            id: resource.sys.id,
            author: {
              name: resource.author!.name!,
              pictureUri:
                resource.author!.picture != null &&
                resource.author!.picture.url != null
                  ? resource.author!.picture.url
                  : undefined,
              twitter: resource.author!.twitter!,
            },
            duration: resource.duration!,
            pictureUri:
              resource.picture != null && resource.picture.url != null
                ? resource.picture.url
                : undefined,
            releasedAt:
              resource.releasedAt && new Date(Date.parse(resource.releasedAt)),
            summary: resource.summary!,
            title: resource.title!,
            text: (resource.content as ContentfulBlogPost).text!,
          });
        }),
      );
  }

  /**
   * Newest resources except `excludeSlug`, mapped for `ResourceRow` (topics via `getResourceTopics`).
   */
  getLatestResources({
    excludeSlug,
    limit,
  }: {
    excludeSlug: string;
    limit: number;
  }): Observable<ResourceRowData[]> {
    return this._contentfulClient
      .query<Query>({
        query: getLatestResources,
        variables: {
          /* One more, in case the excluded resource is among the newest. */
          limit: limit + 1,
          /* Hide wip resources except if we are in wip mode, as the library does. */
          filter: this._wip.isWip() ? {} : { isWip_not: true },
        },
      })
      .pipe(
        map(({ data }) =>
          data!
            .resourceCollection!.items.filter(
              (item): item is ContentfulResource =>
                item != null && item.slug !== excludeSlug,
            )
            .slice(0, limit)
            .map(toResourceRowData),
        ),
      );
  }
}

@NgModule({
  providers: [BlogPostRepository, provideContentfulClient()],
})
export class BlogPostRepositoryModule {}

function toResourceRowData(item: ContentfulResource): ResourceRowData {
  const type = item.resourceType as ResourceType;
  const skillSlugs = [
    ...(item.skillCollection?.items ?? []),
    ...(item.requiredSkillCollection?.items ?? []),
  ]
    .map((skill) => skill?.slug)
    .filter((slug): slug is string => slug != null);
  const topics = getResourceTopics({ skillSlugs });
  return {
    title: item.title!,
    summary: item.summary ?? '',
    kind: getResourceKind(type),
    releasedAt: new Date(Date.parse(item.releasedAt!)),
    duration: item.duration!,
    pictureUri: item.picture?.url ?? undefined,
    topicLabels: RESOURCE_TOPICS.filter(({ value }) =>
      topics.includes(value),
    ).map(({ label }) => label),
    link: getResourceLink({ type, slug: item.slug!, url: item.url! }),
  };
}
