import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SuspenseComponent, SuspenseModule } from './suspense.component';

describe('SuspenseComponent', () => {
  it('🚧 should subscribe and forward data to projected content', () => {
    @Component({
      template: `<mc-suspense></mc-suspense>`,
    })
    class TestedComponent {}

    const fixture = render(TestedComponent);

    expect(fixture).toBeTruthy();
  });
});

async function render(componentType: Type<unknown>) {
  await TestBed.configureTestingModule({
    declarations: [componentType],
    imports: [SuspenseModule],
  }).compileComponents();
  return TestBed.createComponent(componentType);
}
