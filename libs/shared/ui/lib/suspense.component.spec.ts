import { JsonPipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  provideZonelessChangeDetection,
  Type,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NEVER, of, throwError } from 'rxjs';
import { ErrorComponent } from './error.component';
import { LoadingComponent } from './loading.component';
import { SuspenseComponent } from './suspense.component';

describe('SuspenseComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should subscribe and forward data to projected content', async () => {
    @Component({
      imports: [SuspenseComponent],
      template: ` <mc-suspense [data$]="data$">
        <ng-template #data let-data>{{ data }}</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = of(42);
    }

    const { getTextContent } = await render(TestedComponent);

    expect(getTextContent()).toEqual('42');
  });

  it('should show suspense template', async () => {
    @Component({
      imports: [SuspenseComponent, JsonPipe],
      template: ` <mc-suspense [data$]="data$">
        <ng-template #data let-value>{{ value }}</ng-template>
        <ng-template #suspense>⏳</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = NEVER;
    }

    const { getTextContent } = await render(TestedComponent, {
      waitForStable: false,
    });

    await expect.poll(() => getTextContent()).toEqual('⏳');
  });

  it('should show default suspense template', async () => {
    @Component({
      imports: [SuspenseComponent],
      template: ` <mc-suspense [data$]="data$">
        <ng-template #data let-value>{{ value }}</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = NEVER;
    }

    const { hasLoadingSpinner } = await render(TestedComponent, {
      waitForStable: false,
    });

    await expect.poll(() => hasLoadingSpinner()).toBeTruthy();
  });

  it('should show error template', async () => {
    @Component({
      imports: [SuspenseComponent],
      template: ` <mc-suspense [data$]="data$">
        <ng-template #data let-value>{{ value }}</ng-template>
        <ng-template #error let-err>{{ err.message }}</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = throwError(() => new Error('💥'));
    }

    const { getTextContent } = await render(TestedComponent);

    expect(getTextContent()).toEqual('💥');
  });

  it('should show default error template', async () => {
    @Component({
      imports: [SuspenseComponent],
      template: ` <mc-suspense [data$]="data$">
        <ng-template #data let-value>{{ value }}</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = throwError(() => new Error('💥'));
    }

    const { getErrorMessage } = await render(TestedComponent);

    expect(getErrorMessage()).toBe('Oups! Something went wrong.');
  });
});

async function render(
  componentType: Type<unknown>,
  { waitForStable }: { waitForStable: boolean } = { waitForStable: true },
) {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });

  /* Load `mc-suspense` without `mc-error` & `mc-loading`.
   * This avoids file-loader issues etc... and makes the test
   * shallow without having to import implementation details. */
  TestBed.overrideComponent(SuspenseComponent, {
    set: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  });
  TestBed.overrideComponent(SuspenseComponent, {
    remove: {
      imports: [ErrorComponent, LoadingComponent],
    },
  });

  const fixture = TestBed.createComponent(componentType);
  if (waitForStable) {
    await fixture.whenStable();
  }

  return {
    getTextContent() {
      return fixture.nativeElement.textContent;
    },
    getErrorMessage() {
      return fixture.debugElement.query(By.css('mc-error'))?.nativeElement
        .textContent;
    },
    hasLoadingSpinner() {
      return fixture.debugElement.query(By.css('mc-loading')) != null;
    },
  };
}
