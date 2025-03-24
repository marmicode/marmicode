import { provideLocationMocks } from '@angular/common/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from '@jest/globals';
import { NavMenuComponent } from './nav-menu.component';
import { RouterTestingHarness } from '@angular/router/testing';

describe('NavMenuComponent', () => {
  it('should be closed', async () => {
    const { isMenuDisplayed } = await createMenu();
    expect(isMenuDisplayed()).toBe(false);
  });

  it('should open menu', async () => {
    const { isMenuDisplayed, clickToggle } = await createMenu();
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
    const utils = await createMenu();
    await utils.clickToggle();
    return utils;
  }

  async function createMenu() {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
        provideLocationMocks(),
        provideRouter([]),
      ],
    });

    const fixture = TestBed.createComponent(NavMenuComponent);
    await fixture.whenStable();

    return {
      async clickToggle() {
        fixture.debugElement
          .query(By.css('[data-role="menu-button"]'))
          .triggerEventHandler('click', {});
        await fixture.whenStable();
      },
      async clickFirstLink() {
        fixture.debugElement
          .query(By.css('[data-role=vertical-menu] mc-nav-menu-item'))
          .triggerEventHandler('click', {});
        await fixture.whenStable();
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
