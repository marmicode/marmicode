import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createCodeBlock } from '@marmicode/block/core';
import { PushPipe } from '@rx-angular/template/push';
import * as Prism from 'prismjs';
import { createHighlightZone } from '../highlight/highlight-zone';
import { CodeBlockComponent } from './code-block.component';

describe.skip('CodeBlockComponent', () => {
  let fixture: ComponentFixture<CodeBlockComponent>;
  let component: CodeBlockComponent;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [CodeBlockComponent],
      imports: [PushPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compute highlight coordinates', () => {
    fixture.componentRef.setInput(
      'highlightZone',
      createHighlightZone({
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
      }),
    );

    expect(component.highlightStyles()).toEqual([
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

  it('should not crash if no highlight is set', () => {
    expect(component.highlightStyles()).toEqual([]);
  });

  it('should highlight once on code change', () => {
    jest.spyOn(Prism, 'highlightElement');

    fixture.componentRef.setInput(
      'block',
      createCodeBlock({
        language: 'javascript',
        code: `const younes = '\u{1F468}\u{1F3FB}\u200D\u{1F373}'`,
      }),
    );

    expect(Prism.highlightElement).toHaveBeenCalledTimes(0);

    fixture.detectChanges();

    fixture.detectChanges();

    expect(Prism.highlightElement).toHaveBeenCalledTimes(1);
  });
});
