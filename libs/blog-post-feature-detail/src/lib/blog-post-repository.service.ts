import { Injectable, NgModule } from '@angular/core';
import { BlogPost, createBlogPost } from '@marmicode/blog-post-ui';
import {
  BlogPost as ContentfulBlogPost,
  ContentfulModule,
  Query,
} from '@marmicode/contentful-api';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const getBlogPost = gql`
  query getBlogPost($blogPostSlug: String!) {
    resourceCollection(limit: 1, where: { slug: $blogPostSlug }) {
      items {
        sys {
          id
        }
        title
        picture {
          url
        }
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
  constructor(private _apollo: Apollo) {}

  getBlogPost(blogPostSlug: string): Observable<BlogPost> {
    return this._apollo
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
            pictureUri: resource.picture.url,
            title: resource.title,
            text: (resource.content as ContentfulBlogPost).text,
          });
        })
      );
  }
}

@NgModule({
  imports: [ContentfulModule],
  providers: [BlogPostRepository],
})
export class BlogPostRepositoryModule {}
