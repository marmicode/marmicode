import { inject, Injectable, NgModule } from '@angular/core';
import { BlogPost, createBlogPost } from '@marmicode/blog-post/ui';
import {
  BlogPost as ContentfulBlogPost,
  ContentfulClient,
  provideContentfulClient,
  Query,
} from '@marmicode/contentful/infra';
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

@Injectable()
export class BlogPostRepository {
  private _contentfulClient = inject(ContentfulClient);

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
          if (!data) throw new Error('Blog post query failed');
          const resource = data.resourceCollection?.items?.[0];
          if (!resource) {
            throw new Error('Blog post not found');
          }
          const author = resource.author;
          return createBlogPost({
            id: resource.sys.id,
            author: {
              name: author?.name ?? '',
              pictureUri: author?.picture?.url,
              twitter: author?.twitter,
            },
            duration: resource.duration ?? 0,
            pictureUri: resource.picture?.url,
            releasedAt:
              resource.releasedAt &&
              new Date(Date.parse(resource.releasedAt)),
            summary: resource.summary ?? '',
            title: resource.title ?? '',
            text: (resource.content as ContentfulBlogPost | null)?.text ?? '',
          });
        }),
      );
  }
}

@NgModule({
  providers: [BlogPostRepository, provideContentfulClient()],
})
export class BlogPostRepositoryModule {}
