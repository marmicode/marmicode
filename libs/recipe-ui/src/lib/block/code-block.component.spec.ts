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

    expect(await component.highlightCoords$.pipe(first()).toPromise()).toEqual([
      {
        start: 28,
        end: 56,
      },
      {
        start: 196,
        end: 280,
      },
    ]);
  });
});
