import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from '@jest/globals';
import {
  BlockGroup,
  createBlockGroup,
  createTextBlock,
} from '@marmicode/block/core';
import { firstValueFrom } from 'rxjs';
import {
  createHighlightSection,
  createHighlightZone,
  HighlightZone,
} from '../highlight/highlight-zone';
import { BlockGroupComponent } from './block-group.component';

describe('FrameComponent', () => {
  it(`should set '<mc-block>' highlightZone`, async () => {
    const { triggerHighlightZoneChange, getFirstBlock } =
      await renderComponentWithTextBlock();

    await triggerHighlightZoneChange(
      createHighlightZone({
        color: 'red',
        sections: [
          createHighlightSection({
            start: 1,
            end: 2,
          }),
        ],
      }),
    );

    expect(getFirstBlock().properties.highlightZone).toEqual({
      color: 'red',
      sections: [
        createHighlightSection({
          start: 1,
          end: 2,
        }),
      ],
    });
  });

  it('should not reset highlight zone if same block group reference is set', async () => {
    const { component, triggerHighlightZoneChange } =
      await renderComponentWithTextBlock();

    await triggerHighlightZoneChange(
      createHighlightZone({
        color: 'red',
        sections: [
          createHighlightSection({
            start: 1,
            end: 2,
          }),
        ],
      }),
    );

    expect(await firstValueFrom(component.highlightZone$)).not.toBe(null);
  });

  it('should reset highlight zone on block group change', async () => {
    const { component, setBlockGroup, triggerHighlightZoneChange } =
      await renderComponentWithTextBlock();

    await triggerHighlightZoneChange(
      createHighlightZone({
        color: 'red',
        sections: [
          createHighlightSection({
            start: 1,
            end: 2,
          }),
        ],
      }),
    );

    await setBlockGroup(
      createBlockGroup({ blocks: [createTextBlock({ text: 'Bye' })] }),
    );

    expect(await firstValueFrom(component.highlightZone$)).toBe(null);
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

  TestBed.overrideComponent(BlockGroupComponent, {
    set: {
      imports: [AsyncPipe],
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
    async triggerHighlightZoneChange(highlightZone: HighlightZone) {
      getFirstBlock().triggerEventHandler('highlightZoneChange', highlightZone);
      await fixture.whenStable();
    },
    getFirstBlock,
  };
}
