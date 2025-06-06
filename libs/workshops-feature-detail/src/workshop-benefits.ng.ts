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
    :host {
      position: relative;
      display: block;
      background-color: rgb(249, 250, 251);
    }

    :host::before {
      position: absolute;
      height: 4rem;
      clip-path: ellipse(60% 75% at 50% 120%);
      background-color: rgb(249, 250, 251);
      top: -4rem;
      width: 100%;
      content: '';
    }

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
