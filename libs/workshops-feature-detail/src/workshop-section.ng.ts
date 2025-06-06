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
    <section [class.surface]="color() === 'surface'">
      <h2>{{ title() }}</h2>
      <ng-content />
    </section>
  `,
  styles: `
    section {
      position: relative;
      padding-bottom: 3rem;
      display: block;
      background: var(--mc-workshop-section-background-color);
    }

    section.surface {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 10%,
        rgba(56, 0, 48, 0.1) 90%,
        rgba(56, 0, 48, 0.2) 110%
      );
    }

    section::before {
      position: absolute;
      height: 3rem;
      clip-path: ellipse(60% 100% at 50% 120%);
      background: white;
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
  color = input<'surface' | 'plain'>('plain');

  protected realColor = computed(() =>
    this.color() === 'surface'
      ? `linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 10%,
        rgba(56, 0, 48, 0.1) 90%,
        rgba(56, 0, 48, 0.2) 110%
      )`
      : 'white',
  );
}
