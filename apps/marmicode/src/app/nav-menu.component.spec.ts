import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when menu is open', () => {
    beforeEach(() => {
      component.isMenuDisplayed$.next(true);
    });

    xit('🚧 should close menu when link is clicked', () => {
      clickFirstLink();
      expect(component.isMenuDisplayed$.value).toBe(false);
    });
  });

  function clickFirstLink() {
    return fixture.debugElement
      .query(By.css('mc-nav-menu-item'))
      .triggerEventHandler('click', {});
  }
});
