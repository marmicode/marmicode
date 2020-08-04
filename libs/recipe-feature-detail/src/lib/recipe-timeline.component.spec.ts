import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeTimelineComponent } from './recipe-timeline.component';

describe('RecipeTimelineComponent', () => {
  let component: RecipeTimelineComponent;
  let fixture: ComponentFixture<RecipeTimelineComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [RecipeTimelineComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch bullets on timeline', () => {
    component.frames = [
      {
        title: null,
        duration: 1,
        blocks: [],
      },
      {
        title: null,
        duration: 1,
        blocks: [],
      },
      {
        title: null,
        duration: 1,
        blocks: [],
      },
    ];

    expect(component.getFrameChipPosition(0)).toEqual(0);
    expect(component.getFrameChipPosition(1)).toEqual(50);
    expect(component.getFrameChipPosition(2)).toEqual(100);
  });
});
