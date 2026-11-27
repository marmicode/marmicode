import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link } from '@marmicode/shared/ui';
import { BlogPost } from './blog-post';

/**
 * Dark article: header (back link, kicker, title, summary, byline, cover), reading column with `mc-block-group`,
 * sticky "On this page" from the `##` headings, share buttons and author card.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post-article',
  template: `BlogPostArticle - 🚧 work in progress`,
})
export class BlogPostArticle {
  blogPost = input.required<BlogPost>();
  /** Library link, built by the page: `blog-post/ui` can't import `shared/router-helpers`. */
  backLink = input.required<Link>();
}

/**
 * `## Heading` lines of the markdown, with slug ids matching the rendered headings.
 *
 * @deprecated 🚧 work in progress
 */
export function getTableOfContents(
  text: string,
): Array<{ id: string; title: string }> {
  throw new Error('🚧 work in progress');
}
