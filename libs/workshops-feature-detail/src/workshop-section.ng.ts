import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-section',
  template: `
    <section>
      <h2>{{ title() }}</h2>
      <ng-content />
    </section>
  `,
  styles: `
    section {
      position: relative;
      display: block;
      background-color: var(--mc-workshop-section-background-color);
    }

    section::before {
      position: absolute;
      height: 3rem;
      clip-path: ellipse(60% 100% at 50% 120%);
      background-color: var(--mc-workshop-section-background-color);
      top: -3rem;
      width: 100%;
      content: '';
    }

    h2 {
      font-size: 1.75rem; /* ~28px */
      font-weight: 700;
      font-family: 'Inter', sans-serif; /* or your current font */
      color: #380030;
      text-transform: uppercase;
      text-align: center;
    }
  `,
  host: {
    '[style.--mc-workshop-section-background-color]': 'realColor()',
  },
})
export class WorkshopSection {
  title = input.required<string>();
  color = input<'surface' | 'plain'>('surface');

  protected realColor = computed(() => {
    return this.color() === 'surface' ? 'rgb(249, 250, 251)' : 'white';
  });
}
