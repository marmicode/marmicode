import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PushModule } from '@rx-angular/template';
import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  it('should be closed', async () => {
    const { isMenuDisplayed } = createMenu();
    expect(isMenuDisplayed()).toBe(false);
  });

  it('should open menu', async () => {
    const { isMenuDisplayed, clickToggle } = createMenu();
    await clickToggle();
    expect(isMenuDisplayed()).toBe(true);
  });

  describe('given menu is open', () => {
    it('should close menu when menu button is clicked', async () => {
      const { isMenuDisplayed, clickToggle } = await createOpenMenu();
      await clickToggle();
      expect(isMenuDisplayed()).toBe(false);
    });

    it('should close menu when link is clicked', async () => {
      const { clickFirstLink, isMenuDisplayed } = await createOpenMenu();
      await clickFirstLink();
      expect(isMenuDisplayed()).toBe(false);
    });
  });

  async function createOpenMenu() {
    const utils = createMenu();
    await utils.clickToggle();
    return utils;
  }

  function createMenu() {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [NoopAnimationsModule, PushModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    const fixture = TestBed.createComponent(NavMenuComponent);
    fixture.detectChanges();

    return {
      async clickToggle() {
        fixture.debugElement
          .query(By.css('[data-role="menu-button"]'))
          .triggerEventHandler('click', {});
        await flushMacrotasks();
      },
      async clickFirstLink() {
        fixture.debugElement
          .query(By.css('[data-role=vertical-menu] mc-nav-menu-item'))
          .triggerEventHandler('click', {});
        await flushMacrotasks();
      },
      isMenuDisplayed() {
        return (
          fixture.debugElement.query(By.css('[data-role=vertical-menu]')) !=
          null
        );
      },
    };
  }
});

async function flushMacrotasks() {
  return new Promise((resolve) => setTimeout(resolve));
}
