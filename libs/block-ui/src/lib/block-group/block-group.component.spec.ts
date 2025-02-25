import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from '@jest/globals';
import {
  BlockGroup,
  createBlockGroup,
  createTextBlock,
} from '@marmicode/block-core';
import { firstValueFrom } from 'rxjs';
import {
  createHighlightZone,
  HighlightZone,
} from '../highlight/highlight-zone';
import { BlockGroupComponent } from './block-group.component';

describe('FrameComponent', () => {
  it('should not reset highlight zone if same block group reference is set', async () => {
    const { component, triggerHighlightZoneChange } =
      await renderComponentWithTextBlock();

    triggerHighlightZoneChange(
      createHighlightZone({
        color: 'red',
        sections: [],
      }),
    );

    expect(await firstValueFrom(component.highlightZone$)).not.toBe(null);
  });

  it('should reset highlight zone on block group change', async () => {
    const { component, setBlockGroup, triggerHighlightZoneChange } =
      await renderComponentWithTextBlock();

    triggerHighlightZoneChange(
      createHighlightZone({
        color: 'red',
        sections: [],
      }),
    );

    await setBlockGroup(
      createBlockGroup({ blocks: [createTextBlock({ text: 'Bye' })] }),
    );

    expect(await firstValueFrom(component.highlightZone$)).toBe(null);
  });

  it.skip(`should set '<mc-block>' highlightZone without ZoneJS`, async () => {
    const { triggerHighlightZoneChange, getFirstBlock } =
      await renderComponentWithTextBlock();

    await flushRequestAnimationFrame();

    triggerHighlightZoneChange(
      createHighlightZone({
        color: 'red',
        sections: [],
      }),
    );

    await flushRequestAnimationFrame();

    /* Check that the highlight zone is passed to the child component
     * without having to manually trigger the change detection.
     * We have to make sure of this because this is a custom event
     * and it runs outside of zones (and we are preparing our way out
     * of zones so we don't want to run it in zones). */
    expect(getFirstBlock().properties.highlightZone).toEqual({
      color: 'red',
      sections: [],
    });
  });
});

async function renderComponentWithTextBlock() {
  const { setBlockGroup, ...utils } = await renderComponent();

  await setBlockGroup(
    createBlockGroup({ blocks: [createTextBlock({ text: 'Hello' })] }),
  );

  return { setBlockGroup, ...utils };
}

async function renderComponent() {
  TestBed.configureTestingModule({
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
  });

  TestBed.overrideComponent(BlockGroupComponent, {
    add: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  });
  const fixture = TestBed.createComponent(BlockGroupComponent);
  await fixture.whenStable();

  function getFirstBlock() {
    return fixture.debugElement.query(By.css('mc-block'));
  }

  return {
    component: fixture.componentInstance,
    async setBlockGroup(blockGroup: BlockGroup) {
      fixture.componentRef.setInput('blockGroup', blockGroup);
      await fixture.whenStable();
    },
    triggerHighlightZoneChange(highlightZone: HighlightZone) {
      getFirstBlock().triggerEventHandler('highlightZoneChange', highlightZone);
    },
    getFirstBlock,
  };
}

/* Wait for `requestAnimationFrame` to be triggered.
 * This is clearly not the best way but it works. */
export async function flushRequestAnimationFrame() {
  await new Promise(requestAnimationFrame);
}
