import { TestBed } from '@angular/core/testing';
import { MetaDefinition } from '@angular/platform-browser';

import { describe, expect, it } from '@jest/globals';
import { MetaFake, provideMetaFake } from '../testing/meta.fake';
import { provideTitleFake, TitleFake } from '../testing/title.fake';
import {
  createArticlePageInfo,
  PageComponent,
  PageInfo,
} from './page.component';

describe('PageComponent', () => {
  /* Tests issue where page title was set to default title
   * because `info` is null, meanwhile page info is loaded... */
  it('should not touch page title until page info is given', async () => {
    const { titleFake } = await renderComponent();

    expect(titleFake.getTitle()).toBeUndefined();
  });

  /* Tests issue where page title was set to default title
   * because `info` is null, meanwhile page info is loaded... */
  it('should not touch page title if info is null', async () => {
    const { setPageInfo, titleFake } = await renderComponent();

    setPageInfo(null);

    expect(titleFake.getTitle()).toBeUndefined();
  });

  it('should set default page title if title is null', async () => {
    const { setPageInfo, titleFake } = await renderComponent();

    setPageInfo({
      title: null,
    });

    expect(titleFake.getTitle()).toBe('Marmicode');
  });

  it('should set page title', async () => {
    const { setPageInfo, titleFake } = await renderComponent();

    setPageInfo({
      title: '🍔',
    });
    expect(titleFake.getTitle()).toBe('🍔 | Marmicode');
  });

  it('should set page title to default on destroy', async () => {
    const { destroy, setPageInfo, titleFake } = await renderComponent();

    setPageInfo({
      title: '🍔',
    });
    destroy();

    expect(titleFake.getTitle()).toBe('Marmicode');
  });

  it('should set opengraph & twitter meta', async () => {
    const { setPageInfo, getMetaTags } = await renderComponent();

    setPageInfo(
      createArticlePageInfo({
        author: {
          name: 'Younes Jaaidi',
          twitter: 'yjaaidi',
        },
        description: 'Description',
        pictureUri: 'https://picture.url',
        publishedAt: new Date(Date.UTC(2020, 0, 1)),
        title: 'Title',
      }),
    );

    expect(getMetaTags()).toEqual([
      { name: 'description', property: null, content: 'Description' },
      { name: '', property: 'og:description', content: 'Description' },
      { name: '', property: 'og:image', content: 'https://picture.url' },
      { name: '', property: 'twitter:card', content: 'summary_large_image' },
      { name: '', property: 'twitter:description', content: 'Description' },
      { name: '', property: 'twitter:title', content: 'Title | Marmicode' },
      { name: 'author', property: null, content: 'Younes Jaaidi' },
      { name: '', property: 'og:type', content: 'article' },
      {
        name: '',
        property: 'article:published_time',
        content: '2020-01-01T00:00:00.000Z',
      },
      {
        name: '',
        property: 'article:author',
        content: 'https://twitter.com/yjaaidi',
      },
      { name: '', property: 'twitter:creator', content: '@yjaaidi' },
    ] as MetaDefinition[]);
  });

  it('should reset meta when set to null', async () => {
    const { setPageInfo, getMetaTags } = await renderComponent();

    setPageInfo({ title: '🍔' });

    setPageInfo(null);

    expect(getMetaTags()).toEqual([]);
  });

  it('should remove all meta on destroy', async () => {
    const { setPageInfo, destroy, getMetaTags } = await renderComponent();

    setPageInfo(
      createArticlePageInfo({
        author: {
          name: 'Younes Jaaidi',
          twitter: 'yjaaidi',
        },
        description: 'Description',
        pictureUri: 'https://picture.url',
        publishedAt: new Date(Date.UTC(2020, 0, 1)),
        title: 'Title',
      }),
    );

    destroy();

    expect(getMetaTags()).toEqual([]);
  });
});

async function renderComponent() {
  await TestBed.configureTestingModule({
    providers: [provideMetaFake(), provideTitleFake()],
  });

  const fixture = TestBed.createComponent(PageComponent);
  await fixture.whenStable();
  return {
    destroy() {
      fixture.destroy();
    },
    setPageInfo(info: PageInfo) {
      fixture.componentRef.setInput('info', info);
    },
    getMetaTags() {
      return TestBed.inject(MetaFake)
        .getTags()
        .map((el) => ({
          name: el.name,
          content: el.content,
          property: el.getAttribute('property'),
        }));
    },
    titleFake: TestBed.inject(TitleFake),
  };
}
