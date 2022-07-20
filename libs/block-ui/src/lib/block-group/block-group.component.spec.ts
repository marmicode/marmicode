import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockType, createBlockGroup } from '@marmicode/block-core';
import { PushModule } from '@rx-angular/template';
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
      imports: [PushModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it(`should set '<mc-block>' highlightZone without ZoneJS`, async () => {
    component.blockGroup = createBlockGroup({
      blocks: [
        {
          type: BlockType.Code,
          code: `const younes = '👨🏻‍🍳';`,
          language: 'javascript',
        },
      ],
    });

    await flushRequestAnimationFrame();

    component.onHighlightZone(
      createHighlightZone({
        color: 'red',
        sections: [],
      })
    );

    await flushRequestAnimationFrame();

    /* Check that the highlight zone is passed to the child component
     * without having to manually trigger the change detection.
     * We have to make sure of this because this is a custom event
     * and it runs outside of zones (and we are preparing our way out
     * of zones so we don't want to run it in zones). */
    const blockEl = fixture.debugElement.query(By.css('mc-block'));
    expect(blockEl.properties.highlightZone).toEqual({
      color: 'red',
      sections: [],
    });
  });
});

/* Wait for `requestAnimationFrame` to be triggered.
 * This is clearly not the best way but it works. */
export async function flushRequestAnimationFrame() {
  await new Promise(requestAnimationFrame);
}
