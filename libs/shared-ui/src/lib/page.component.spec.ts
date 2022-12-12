import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createArticlePageInfo, PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let metaService: jest.Mocked<Meta>;
  let titleService: jest.Mocked<Title>;

  beforeEach(async () => {
    metaService = {
      addTags: jest.fn(),
      removeTag: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    titleService = {
      setTitle: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PageComponent],
      providers: [
        {
          provide: Meta,
          useValue: metaService,
        },
        {
          provide: Title,
          useValue: titleService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(Title);
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  /* Tests issue where page title was set to default title
   * because `info` is null, meanwhile page info is loaded.. */
  it('should not touch page title until page info is given', () => {
    expect(titleService.setTitle).not.toBeCalled();
  });

  /* Tests issue where page title was set to default title
   * because `info` is null, meanwhile page info is loaded.. */
  it('should not touch page title if info is null', () => {
    component.info = null;
    expect(titleService.setTitle).not.toBeCalled();
  });

  it('should set default page title if title is null', () => {
    component.info = {
      title: null,
    };
    expect(titleService.setTitle).toBeCalledTimes(1);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('Marmicode');
  });

  it('should set page title', () => {
    component.info = {
      title: '🍔',
    };
    expect(titleService.setTitle).toBeCalledTimes(1);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('🍔 | Marmicode');
  });

  it('should set page title to default on destroy', () => {
    component.info = {
      title: '🍔',
    };
    fixture.destroy();
    expect(titleService.setTitle).toBeCalledTimes(2);
    expect(titleService.setTitle).toHaveBeenLastCalledWith('Marmicode');
  });

  it('should set opengraph & twitter meta', () => {
    component.info = createArticlePageInfo({
      author: {
        name: 'Younes Jaaidi',
        twitter: 'yjaaidi',
      },
      description: 'Description',
      pictureUri: 'https://picture.url',
      publishedAt: new Date(Date.UTC(2020, 0, 1)),
      title: 'Title',
    });

    expect(metaService.addTags).toBeCalledTimes(1);
    expect(metaService.addTags).toBeCalledWith([
      { name: 'description', content: 'Description' },
      { property: 'og:description', content: 'Description' },
      { property: 'og:image', content: 'https://picture.url' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: 'Description' },
      { property: 'twitter:title', content: 'Title | Marmicode' },
      { name: 'author', content: 'Younes Jaaidi' },
      { property: 'og:type', content: 'article' },
      {
        property: 'article:published_time',
        content: '2020-01-01T00:00:00.000Z',
      },
      { property: 'article:author', content: 'https://twitter.com/yjaaidi' },
      { property: 'twitter:creator', content: '@yjaaidi' },
    ] as MetaDefinition[]);
  });

  it('should reset meta when set to null', () => {
    component.info = null;
    expect(metaService.removeTag).toBeCalled();
  });

  it('should remove all meta on destroy', () => {
    metaService.removeTag.mockReset();
    fixture.destroy();
    expect(metaService.removeTag.mock.calls).toEqual([
      ['name="author"'],
      ['name="description"'],
      ['property="og:type"'],
      ['property="og:description"'],
      ['property="og:image"'],
      ['property="article:published_time"'],
      ['property="article:author"'],
      ['property="twitter:card"'],
      ['property="twitter:creator"'],
      ['property="twitter:description"'],
      ['property="twitter:title"'],
    ]);
  });
});
