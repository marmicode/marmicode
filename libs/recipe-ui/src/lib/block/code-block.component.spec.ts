import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import {
  CodeBlockComponent,
  createHighlightInfo,
} from './code-block.component';

describe('CodeBlockComponent', () => {
  let fixture: ComponentFixture<CodeBlockComponent>;
  let component: CodeBlockComponent;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [CodeBlockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compute highlight coordinates', async () => {
    component.highlight = createHighlightInfo({
      zones: [
        {
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
        },
      ],
    });

    expect(await component.highlightStyles$.pipe(first()).toPromise()).toEqual([
      {
        color: 'red',
        top: 46 /* 28 (one line height) + 18 (offset). */,
        height: 28,
      },
      {
        color: 'red',
        top: 214 /* 196 (7 * 28) + 18 (offset). */,
        height: 84,
      },
    ]);
  });

  it('should not crash if no highlight is set', async () => {
    component.highlight = null;
    expect(await component.highlightStyles$.pipe(first()).toPromise()).toEqual(
      []
    );
  });
});
