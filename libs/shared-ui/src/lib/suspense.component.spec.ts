import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SuspenseComponent, SuspenseModule } from './suspense.component';

describe('SuspenseComponent', () => {
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
