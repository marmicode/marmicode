import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { CodeBlockComponent, HighlightZone } from './code-block.component';

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
    /* Set line height manually. */
    component['_state'].set({ lineHeight: 28 });
  });

  it('should compute highlight coordinates', async () => {
    component.highlightZone = {
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
    } as HighlightZone;

    expect(await component.highlightStyles$.pipe(first()).toPromise()).toEqual([
      {
        color: 'red',
        top: 48 /* 28 (one line height) + 20 (offset). */,
        height: 28,
      },
      {
        color: 'red',
        top: 216 /* 196 (7 * 28) + 20 (offset). */,
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
});
