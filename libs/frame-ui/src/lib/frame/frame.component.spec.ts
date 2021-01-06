import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockType, createFrame } from '@marmicode/frame-core';
import { first } from 'rxjs/operators';
import { createHighlightZone } from '../highlight/highlight-zone';
import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;
  const frame = createFrame({
    blocks: [],
    duration: 2,
    slug: 'without-validation',
    title: 'Without validation',
  });

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [FrameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    component.frame = frame;
    fixture.detectChanges();
  });

  it('should not reset highlight zone if same frame reference is set', async () => {
    component.onHighlightZone(
      createHighlightZone({
        color: 'red',
        sections: [],
      })
    );
    component.frame = frame;
    expect(await component.highlightZone$.pipe(first()).toPromise()).not.toBe(
      null
    );
  });

  it('should reset highlight zone on frame change', async () => {
    component.onHighlightZone(
      createHighlightZone({
        color: 'red',
        sections: [],
      })
    );
    component.frame = createFrame({
      blocks: [],
      duration: 3,
      slug: 'another-one',
      title: 'Another One',
    });
    expect(await component.highlightZone$.pipe(first()).toPromise()).toBe(null);
  });
});
