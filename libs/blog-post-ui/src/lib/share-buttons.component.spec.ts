import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShareButtonsComponent } from './share-buttons.component';

describe('ShareButtonsComponent', () => {
  let component: ShareButtonsComponent;
  let fixture: ComponentFixture<ShareButtonsComponent>;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [ShareButtonsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareButtonsComponent);
    component = fixture.componentInstance;

    component.author = {
      name: 'Younes Jaaidi',
      twitter: 'yjaaidi',
    };
    component.title = 'Component Testing';

    fixture.detectChanges();
  });

  it('should construct title', () => {
    expect(
      fixture.debugElement.query(By.css('share-buttons')).properties.description
    ).toEqual('Component Testing by Younes Jaaidi on @Marmicode');
  });

  it('should construct twitter title', () => {
    expect(
      fixture.debugElement.query(By.css('share-button')).properties.description
    ).toEqual('Component Testing by @yjaaidi on @Marmicode');
  });
});
