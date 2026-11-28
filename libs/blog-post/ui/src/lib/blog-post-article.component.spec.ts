import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Link } from '@marmicode/shared/ui';
import { describe, expect, it } from 'vitest';
import { BlogPost, createBlogPost } from './blog-post';
import {
  BlogPostArticle,
  getTableOfContents,
} from './blog-post-article.component';

describe(getTableOfContents.name, () => {
  it('table of contents from headings', () => {
    const toc = getTableOfContents(`Intro.

## Why

Because.

### Detail

More.

## Set it up

Done.`);

    expect(toc).toEqual([
      { id: 'why', title: 'Why' },
      { id: 'set-it-up', title: 'Set it up' },
    ]);
  });

  it('table of contents from top-level headings', () => {
    const toc = getTableOfContents(`# Why

## Step one

# How`);

    expect(toc).toEqual([
      { id: 'why', title: 'Why' },
      { id: 'how', title: 'How' },
    ]);
  });
});

describe(BlogPostArticle.name, () => {
  it('article header and table of contents', async () => {
    const { getBackLink, getTableOfContentsLinks, getText, getTitle } =
      await mountBlogPostArticle({
        blogPost: BLOG_POST,
        backLink: { route: ['/', 'library'] },
      });

    expect(getTitle()).toBe(BLOG_POST.title);
    expect(getText()).toContain('6 min read');
    expect(getBackLink()?.getAttribute('href')).toBe('/library');
    expect(getTableOfContentsLinks()).toEqual([
      { title: 'Why', href: expect.stringMatching(/#why$/) },
      { title: 'Set it up', href: expect.stringMatching(/#set-it-up$/) },
    ]);
  });

  it('author follow links', async () => {
    const { getFollowLinks } = await mountBlogPostArticle({
      blogPost: BLOG_POST,
      backLink: { route: ['/', 'library'] },
    });

    expect(getFollowLinks()).toEqual([
      { label: 'Follow Younes Jaaidi on X', href: 'https://x.com/yjaaidi' },
      {
        label: 'Follow Younes Jaaidi on Bluesky',
        href: 'https://bsky.app/profile/younesjd.dev',
      },
      {
        label: 'Follow Younes Jaaidi on LinkedIn',
        href: 'https://www.linkedin.com/in/yjaaidi',
      },
    ]);
  });

  it('author without Bluesky or LinkedIn', async () => {
    const { getFollowLinks } = await mountBlogPostArticle({
      blogPost: createBlogPost({
        ...BLOG_POST,
        author: { name: 'Guest Cook', twitter: 'guestcook' },
      }),
      backLink: { route: ['/', 'library'] },
    });

    expect(getFollowLinks()).toEqual([
      { label: 'Follow Guest Cook on X', href: 'https://x.com/guestcook' },
    ]);
  });
});

const BLOG_POST: BlogPost = createBlogPost({
  id: 'angular-template-code-coverage',
  author: {
    name: 'Younes Jaaidi',
    pictureUri: 'https://picture.url/younes',
    twitter: 'yjaaidi',
    bluesky: 'younesjd.dev',
    linkedin: 'yjaaidi',
  },
  duration: 6,
  releasedAt: new Date('2024-11-18'),
  summary:
    'How turning on Ahead-Of-Time compilation for your Angular tests enables accurate template code coverage.',
  title:
    'The Missing Ingredient for Angular Template Code Coverage and Future-Proof Testing',
  text: `Code coverage only tells half the story.

## Why

Templates are invisible to it.

## Set it up

Turn AOT on.`,
});

async function mountBlogPostArticle({
  blogPost,
  backLink,
}: {
  blogPost: BlogPost;
  backLink: Link;
}) {
  @Component({
    imports: [BlogPostArticle],
    template: `<mc-blog-post-article
      [backLink]="backLink()"
      [blogPost]="blogPost()"
    />`,
  })
  class TestHost {
    backLink = signal(backLink);
    blogPost = signal(blogPost);
  }

  TestBed.configureTestingModule({ providers: [provideRouter([])] });

  const fixture = TestBed.createComponent(TestHost);
  await fixture.whenStable();

  const element: HTMLElement = fixture.nativeElement;

  return {
    getBackLink() {
      return Array.from(element.querySelectorAll('a')).find(
        (link) => link.textContent?.trim() === 'Library',
      );
    },
    getTableOfContentsLinks() {
      const toc = element.querySelector('[aria-label="On this page"]');
      return Array.from(toc?.querySelectorAll('a') ?? []).map((link) => ({
        title: link.textContent?.trim(),
        href: link.getAttribute('href'),
      }));
    },
    getFollowLinks() {
      return Array.from(element.querySelectorAll('mc-follow-links a')).map(
        (link) => ({
          label: link.getAttribute('aria-label'),
          href: link.getAttribute('href'),
        }),
      );
    },
    getText() {
      return element.textContent;
    },
    getTitle() {
      return element.querySelector('h1')?.textContent?.trim();
    },
  };
}
