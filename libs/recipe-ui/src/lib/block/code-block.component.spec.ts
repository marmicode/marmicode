import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as marked from 'marked';
import { CodeBlockComponent } from './code-block.component';
import Code = marked.Tokens.Code;

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

  xit('should compute highlight coordinates', () => {});
});
