import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createBlockGroup } from '@marmicode/block-core';
import { first } from 'rxjs/operators';
import { createHighlightZone } from '../highlight/highlight-zone';
import { BlockGroupComponent } from './block-group.component';

describe('FrameComponent', () => {
  let component: BlockGroupComponent;
  let fixture: ComponentFixture<BlockGroupComponent>;
  const blockGroup = createBlockGroup({
    blocks: [],
  });

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [BlockGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockGroupComponent);
    component = fixture.componentInstance;
    component.blockGroup = blockGroup;
    fixture.detectChanges();
  });

  it('should not reset highlight zone if same block group reference is set', async () => {
    component.onHighlightZone(
      createHighlightZone({
        color: 'red',
        sections: [],
      })
    );
    component.blockGroup = blockGroup;
    expect(await component.highlightZone$.pipe(first()).toPromise()).not.toBe(
      null
    );
  });

  it('should reset highlight zone on block group change', async () => {
    component.onHighlightZone(
      createHighlightZone({
        color: 'red',
        sections: [],
      })
    );
    component.blockGroup = createBlockGroup({
      blocks: [],
    });
    expect(await component.highlightZone$.pipe(first()).toPromise()).toBe(null);
  });
});
