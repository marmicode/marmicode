import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createCodeBlock } from '@marmicode/block-core';
import { first } from 'rxjs/operators';
import { createHighlightZone } from '../highlight/highlight-zone';
import { CodeBlockComponent } from './code-block.component';
import * as Prism from 'prismjs';
import { PushModule } from '@rx-angular/template';

describe('CodeBlockComponent', () => {
  let fixture: ComponentFixture<CodeBlockComponent>;
  let component: CodeBlockComponent;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [CodeBlockComponent],
      imports: [PushModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    /* Set line height manually. */
    component['_state'].set({ lineHeight: 28 });
  });

  it('should compute highlight coordinates', async () => {
    component.highlightZone = createHighlightZone({
      color: 'red',
      sections: [
        {
          start: 2,
          end: 2,
        },
        {
          start: 8,
          end: 10,
        },
      ],
    });

    expect(await component.highlightStyles$.pipe(first()).toPromise()).toEqual([
      {
        color: 'red',
        top: 38 /* 28 (one line height) + 10 (offset). */,
        height: 28,
      },
      {
        color: 'red',
        top: 206 /* 196 (7 * 28) + 10 (offset). */,
        height: 84,
      },
    ]);
  });

  it('should not crash if no highlight is set', async () => {
    component.highlightZone = null;
    expect(await component.highlightStyles$.pipe(first()).toPromise()).toEqual(
      []
    );
  });

  /* This checks an issue where the highlight was triggered on every view check. */
  it('should highlight once on code change', () => {
    /* Call through as we want the dom to be updated. */
    jest.spyOn(Prism, 'highlightElement');

    component.block = createCodeBlock({
      language: 'javascript',
      code: `const younes = '👨🏻‍🍳'`,
    });

    /* Wait for view check to call highlight. */
    expect(Prism.highlightElement).toBeCalledTimes(0);

    /* Trigger view check. */
    fixture.detectChanges();

    /* Double call doesn't trigger highlight twice. */
    fixture.detectChanges();

    expect(Prism.highlightElement).toBeCalledTimes(1);
  });
});
