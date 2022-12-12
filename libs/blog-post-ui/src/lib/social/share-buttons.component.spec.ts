import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from '@jest/globals';
import { PushModule } from '@rx-angular/template';
import { ShareButtonsComponent } from './share-buttons.component';

describe('ShareButtonsComponent', () => {
  it('should construct title', () => {
    const { getOtherShareButtonsDescription } = createComponent();
    expect(getOtherShareButtonsDescription()).toEqual(
      'Component Testing by Younes Jaaidi on @Marmicode'
    );
  });

  it('should construct twitter title', () => {
    const { getTwitterShareButtonsDescription } = createComponent();
    expect(getTwitterShareButtonsDescription()).toEqual(
      'Component Testing by @yjaaidi on @Marmicode'
    );
  });

  function createComponent() {
    TestBed.configureTestingModule({
      declarations: [ShareButtonsComponent],
      imports: [PushModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    const fixture = TestBed.createComponent(ShareButtonsComponent);
    const component = fixture.componentInstance;

    component.author = {
      name: 'Younes Jaaidi',
      twitter: 'yjaaidi',
    };
    component.title = 'Component Testing';
    fixture.detectChanges();

    return {
      getTwitterShareButtonsDescription() {
        return fixture.debugElement.queryAll(By.css('share-buttons'))[0]
          .properties.description;
      },
      getOtherShareButtonsDescription() {
        return fixture.debugElement.queryAll(By.css('share-buttons'))[1]
          .properties.description;
      },
    };
  }
});
