import { ViewportScroller } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RecipeFramePageComponent } from './recipe-frame-page.component';
import { Recipe, RecipeRepository } from './recipe-repository.service';

describe('RecipeFramePageComponent', () => {
  let component: RecipeFramePageComponent;
  let fixture: ComponentFixture<RecipeFramePageComponent>;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [RecipeFramePageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['frameSlug', 'install-express-gateway']])),
          },
        },
        {
          provide: RecipeRepository,
          useValue: {
            getRecipe: jest.fn().mockReturnValue(
              of({
                title: 'Setup Express Gateway',
                frames: [
                  {
                    title: 'Install Express Gateway',
                    slug: 'install-express-gateway',
                  },
                ],
              } as Recipe)
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
            scrollToPosition: jest.fn(),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFramePageComponent);
    component = fixture.componentInstance;
  });

  it('should combine recipe & frame titles', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('mc-page')).properties.info
      .title;
    expect(title).toEqual(
      'Setup Express Gateway > 0 - Install Express Gateway'
    );
  });
});
