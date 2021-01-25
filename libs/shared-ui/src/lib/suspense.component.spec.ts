import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NEVER, of, throwError } from 'rxjs';
import { SuspenseComponent, SuspenseModule } from './suspense.component';

describe('SuspenseComponent', () => {
  beforeEach(() => jest.spyOn(console, 'error'));

  afterEach(() => jest.resetAllMocks());

  it('should subscribe and forward data to projected content', async () => {
    @Component({
      template: `<mc-suspense [data$]="data$">
        <ng-template #data let-data>{{ data }}</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = of(42);
    }

    const fixture = await render(TestedComponent);

    expect(fixture.debugElement.nativeElement.textContent).toEqual('42');
  });

  it('should show suspense template', async () => {
    @Component({
      template: `<mc-suspense [data$]="data$">
        <ng-template #data let-value>{{ value }}</ng-template>
        <ng-template #suspense>⏳</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = NEVER;
    }

    const fixture = await render(TestedComponent);

    expect(fixture.debugElement.nativeElement.textContent).toEqual('⏳');
  });

  it('should show error template', async () => {
    @Component({
      template: `<mc-suspense [data$]="data$">
        <ng-template #data let-value>{{ value }}</ng-template>
        <ng-template #error let-err>{{ err }}</ng-template>
      </mc-suspense>`,
    })
    class TestedComponent {
      data$ = throwError('💥');
    }

    const fixture = await render(TestedComponent);

    expect(fixture.debugElement.nativeElement.textContent).toEqual('💥');
  });
});

async function render(componentType: Type<unknown>) {
  await TestBed.configureTestingModule({
    declarations: [componentType],
    imports: [SuspenseModule],
  }).compileComponents();
  const fixture = TestBed.createComponent(componentType);
  fixture.detectChanges();
  return fixture;
}