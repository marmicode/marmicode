import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Benefit } from '@marmicode/training/core';

/**
 * 4/2/1-column grid of benefit tiles (icon, title, description).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-benefit-grid',
  imports: [MatIconModule],
  template: `
    @for (benefit of benefits(); track $index) {
      <div class="benefit mc-surface mc-surface-interactive">
        <div class="icon" aria-hidden="true">
          <mat-icon [fontIcon]="benefit.icon" />
        </div>
        <h3>{{ benefit.title }}</h3>
        <p>{{ benefit.description }}</p>
      </div>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
      color: var(--mc-dark-text);
    }

    @media (max-width: 1000px) {
      :host {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 560px) {
      :host {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .benefit {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 22px;
    }

    .icon {
      display: grid;
      flex: none;
      place-items: center;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.28);
      border-radius: 12px;
      background: rgba(var(--mc-accent-rgb), 0.12);
      color: var(--mc-accent-bright);
    }

    h3 {
      margin: 6px 0 0;
      font-size: 17px;
      letter-spacing: -0.015em;
    }

    p {
      margin: 0;
      color: var(--mc-dark-muted);
      font-size: 14.5px;
    }
  `,
})
export class TrainingBenefitGrid {
  benefits = input.required<Benefit[]>();
}
