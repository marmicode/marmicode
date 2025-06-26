import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WorkshopBenefitCard } from './workshop-benefits-card.ng';
import { WorkshopSection } from './internal/workshop-section.ng';
import { Benefit } from '@marmicode/workshop/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-benefits',
  imports: [WorkshopBenefitCard, WorkshopSection],
  template: `
    <mc-workshop-section title="🍱 What you'll learn" color="surface">
      <div class="benefits">
        @for (benefit of benefits(); track benefit) {
          <mc-workshop-benefit-card [benefit]="benefit" />
        }
      </div>
    </mc-workshop-section>
  `,
  styles: `
    .benefits {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      padding: 2rem 0;
    }
  `,
})
export class WorkshopBenefits {
  benefits = input.required<Benefit[]>();
}
