import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from '@jest/globals';
import { readFirst } from '@nrwl/angular/testing';
import { PushModule } from '@rx-angular/template';
import { RecipeTimelineComponent } from './recipe-timeline.component';

describe('RecipeTimelineComponent', () => {
  let component: RecipeTimelineComponent;
  let fixture: ComponentFixture<RecipeTimelineComponent>;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [RecipeTimelineComponent],
      imports: [PushModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTimelineComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch bullets on timeline', async () => {
    component.currentFrameIndex = 0;
    component.frames = [
      {
        slug: null,
        title: null,
        duration: 1,
        blocks: [],
      },
      {
        slug: null,
        title: null,
        duration: 1,
        blocks: [],
      },
      {
        slug: null,
        title: null,
        duration: 1,
        blocks: [],
      },
    ];

    expect(await readFirst(component.bullets$)).toEqual([
      expect.objectContaining({
        position: 0,
      }),
      expect.objectContaining({
        position: 50,
      }),
      expect.objectContaining({
        position: 100,
      }),
    ]);
  });
});
