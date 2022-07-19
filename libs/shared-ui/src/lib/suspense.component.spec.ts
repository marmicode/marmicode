import { Component, CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LetModule } from '@rx-angular/template';
import { NEVER, of, throwError } from 'rxjs';
import { SuspenseComponent, SuspenseModule } from './suspense.component';

describe('SuspenseComponent', () => {
  beforeEach(() => jest.spyOn(console, 'error'));

  afterEach(() => jest.resetAllMocks());

  it('should subscribe and forward data to projected content', async () => {
    @Component({
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
    declarations: [componentType, SuspenseComponent],
    imports: [LetModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  const fixture = TestBed.createComponent(componentType);

  fixture.detectChanges();

  /* Wait for request animation frame. */
  await new Promise(requestAnimationFrame);

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
