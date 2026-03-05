import {
  MOCK_PLATFORM_LOCATION_CONFIG,
  MockPlatformLocationConfig,
} from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { MetaDefinition } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { MetaFake, provideMetaFake } from '../testing/meta.fake';
import { provideTitleFake, TitleFake } from '../testing/title.fake';
import { HtmlAdapterFake, provideHtmlAdapterFake } from './html-adapter.fake';
import {
  createArticlePageInfo,
  PageComponent,
  PageInfo,
} from './page.component';

describe('PageComponent', () => {
  /* Tests issue where page title was set to default title
   * because `info` is null, meanwhile page info is loaded... */
  it('does not touch page title until page info is given', async () => {
    const { titleFake } = await renderComponent();

    expect(titleFake.getTitle()).toBeUndefined();
  });

  /* Tests issue where page title was set to default title
   * because `info` is null, meanwhile page info is loaded... */
  it('does not touch page title if info is null', async () => {
    const { setPageInfo, titleFake } = await renderComponent();

    setPageInfo(null);

    expect(titleFake.getTitle()).toBeUndefined();
  });

  it('sets default page title if title is null', async () => {
    const { setPageInfo, titleFake } = await renderComponent();

    setPageInfo({
      title: null,
    });

    await expect.poll(() => titleFake.getTitle()).toBe('Marmicode');
  });

  it('sets page title', async () => {
    const { setPageInfo, titleFake } = await renderComponent();

    setPageInfo({ title: '🍔' });

    await expect.poll(() => titleFake.getTitle()).toBe('🍔 | Marmicode');
  });

  it('sets page title to default after destroy', async () => {
    const { destroyOnceStable, setPageInfo, titleFake } =
      await renderComponent();

    setPageInfo({ title: '🍔' });
    await destroyOnceStable();

    await expect.poll(() => titleFake.getTitle()).toBe('Marmicode');
  });

  it('sets html[lang] attribute to page info language', async () => {
    const { htmlAdapterFake, setPageInfo } = await renderComponent();

    setPageInfo({ language: 'fr' });

    await expect
      .poll(() => htmlAdapterFake.getHtmlAttribute('lang'))
      .toBe('fr');
  });

  it('rolls back html[lang] attribute to default (en)', async () => {
    const { htmlAdapterFake, setPageInfo, destroyOnceStable } =
      await renderComponent();

    setPageInfo({ language: 'fr' });

    await destroyOnceStable();

    await expect
      .poll(() => htmlAdapterFake.getHtmlAttribute('lang'))
      .toBe('en');
  });

  it('sets canonical and alternate links when `alternates` is provided', async () => {
    const { htmlAdapterFake, setPageInfo } = await renderComponent();

    setPageInfo({
      alternates: [
        { path: '/workshops/test-angular-pragmatique', language: 'fr' },
        { path: '/workshops/pragmatic-angular-testing', language: 'en' },
      ],
    });

    await expect
      .poll(
        () =>
          htmlAdapterFake.getLinkTags().find((e) => e.rel === 'canonical').href,
      )
      .toBe('https://marmicode.io/workshops/pragmatic-angular-testing');
    await expect
      .poll(() =>
        htmlAdapterFake.getLinkTags().filter((e) => e.rel === 'alternate'),
      )
      .toMatchObject([
        {
          href: 'https://marmicode.io/workshops/test-angular-pragmatique',
          hreflang: 'fr',
        },
        {
          href: 'https://marmicode.io/workshops/pragmatic-angular-testing',
          hreflang: 'en',
        },
        {
          href: 'https://marmicode.io/workshops/pragmatic-angular-testing',
          hreflang: 'x-default',
        },
      ]);
  });

  it('removes canonical and alternate links when component is destroyed', async () => {
    const { destroyOnceStable, htmlAdapterFake, setPageInfo } =
      await renderComponent();

    setPageInfo({
      alternates: [
        { path: '/workshops/test-angular-pragmatique', language: 'fr' },
        { path: '/workshops/pragmatic-angular-testing', language: 'en' },
      ],
    });

    await destroyOnceStable();

    await expect
      .poll(() =>
        htmlAdapterFake.getLinkTags().find((e) => e.rel === 'canonical'),
      )
      .toBeUndefined();
    await expect
      .poll(() =>
        htmlAdapterFake.getLinkTags().filter((e) => e.rel === 'alternate'),
      )
      .toHaveLength(0);
  });

  it('sets opengraph & twitter meta', async () => {
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

    await expect
      .poll(() => getMetaTags())
      .toEqual([
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
        {
          name: '',
          property: 'article:author',
          content: 'https://twitter.com/yjaaidi',
        },
      ] as MetaDefinition[]);
  });

  it('should reset meta when set to null', async () => {
    const { setPageInfo, getMetaTags } = await renderComponent();

    setPageInfo({ title: '🍔' });

    setPageInfo(null);

    expect(getMetaTags()).toEqual([]);
  });

  it('should remove all meta on destroy', async () => {
    const { setPageInfo, destroyOnceStable, getMetaTags } =
      await renderComponent();

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

    await destroyOnceStable();

    expect(getMetaTags()).toEqual([]);
  });
});

async function renderComponent() {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: MOCK_PLATFORM_LOCATION_CONFIG,
        useValue: {
          startUrl: 'https://marmicode.io',
        } satisfies MockPlatformLocationConfig,
      },
      provideMetaFake(),
      provideTitleFake(),
      provideHtmlAdapterFake(),
    ],
  });

  const fixture = TestBed.createComponent(PageComponent);

  return {
    destroyOnceStable: async () => {
      await fixture.whenStable();
      fixture.destroy();
    },
    setPageInfo: (info: PageInfo) =>
      fixture.componentRef.setInput('info', info),
    getMetaTags: () =>
      TestBed.inject(MetaFake)
        .getTags()
        .map((el) => ({
          name: el.name,
          content: el.content,
          property: el.getAttribute('property'),
        })),
    whenStable: () => fixture.whenStable(),
    htmlAdapterFake: TestBed.inject(HtmlAdapterFake),
    titleFake: TestBed.inject(TitleFake),
  };
}
