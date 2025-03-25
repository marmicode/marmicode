import { JsonPipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  provideExperimentalZonelessChangeDetection,
  Type,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { NEVER, of, throwError } from 'rxjs';
import { ErrorComponent } from './error.component';
import { LoadingComponent } from './loading.component';
import { SuspenseComponent } from './suspense.component';

describe('SuspenseComponent', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
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

    const { getTextContent } = await render(TestedComponent);

    expect(getTextContent()).toEqual('⏳');
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

    const { hasLoadingSpinner } = await render(TestedComponent);

    expect(hasLoadingSpinner()).toBeTruthy();
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

async function render(componentType: Type<unknown>) {
  TestBed.configureTestingModule({
    providers: [provideExperimentalZonelessChangeDetection()],
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

  await fixture.whenStable();

  return {
    getTextContent() {
      return fixture.debugElement.nativeElement.textContent;
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
