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
          const resource = data.resourceCollection.items[0];
          return createBlogPost({
            id: resource.sys.id,
            author: {
              name: resource.author.name,
              pictureUri: resource.author.picture?.url,
              twitter: resource.author.twitter,
            },
            duration: resource.duration,
            pictureUri: resource.picture?.url,
            releasedAt:
              resource.releasedAt && new Date(Date.parse(resource.releasedAt)),
            summary: resource.summary,
            title: resource.title,
            text: (resource.content as ContentfulBlogPost).text,
          });
        }),
      );
  }
}

@NgModule({
  providers: [BlogPostRepository, provideContentfulClient()],
})
export class BlogPostRepositoryModule {}
