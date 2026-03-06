import { ViewportScroller } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PushPipe } from '@rx-angular/template/push';
import { of } from 'rxjs';
import { RecipeFramePageComponent } from './recipe-frame-page.component';
import { Recipe, RecipeRepository } from './recipe-repository.service';

describe('RecipeFramePageComponent', () => {
  let fixture: ComponentFixture<RecipeFramePageComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              new Map([
                ['recipeSlug', 'setup-express-gateway'],
                ['frameSlug', 'install-express-gateway'],
              ]),
            ),
          },
        },
        {
          provide: RecipeRepository,
          useValue: {
            getRecipe: vi.fn().mockReturnValue(
              of({
                title: 'Setup Express Gateway',
                frames: [
                  {
                    title: 'Install Express Gateway',
                    slug: 'install-express-gateway',
                  },
                ],
              } as Recipe),
            ),
          },
        },
        {
          provide: Router,
          useValue: {},
        },
        {
          provide: ViewportScroller,
          useValue: {
            scrollToPosition: vi.fn(),
          },
        },
      ],
    });

    TestBed.overrideComponent(RecipeFramePageComponent, {
      set: {
        imports: [PushPipe],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFramePageComponent);
  });

  it('should combine recipe & frame titles', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('mc-page')).properties[
      'info'
    ].title;
    expect(title).toEqual(
      'Setup Express Gateway > 0 - Install Express Gateway',
    );
  });
});
