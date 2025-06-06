import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkshopBenefitsCard } from './workshop-benefits-card.ng';
import { WorkshopSection } from './workshop-section.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-benefits',
  imports: [WorkshopBenefitsCard, WorkshopSection],
  template: `
    <mc-workshop-section title="🍱 What you'll learn">
      <div class="benefits">
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
      </div>
    </mc-workshop-section>
  `,
  styles: `
    .benefits {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      padding: 2rem;
    }
  `,
})
export class WorkshopBenefits {}
