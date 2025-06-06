import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkshopBenefitsCard } from './workshop-benefits-card.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-benefits',
  imports: [WorkshopBenefitsCard],
  template: `
    <section>
      <h2>🍱 What you'll learn</h2>

      <div class="benefits">
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
        <mc-workshop-benefits-card />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      background-color: rgb(249, 250, 251);
      padding: 2rem;
    }

    h2 {
      font-size: 1.75rem; /* ~28px */
      font-weight: 700;
      font-family: 'Inter', sans-serif; /* or your current font */
      color: #380030;
      text-transform: uppercase;
      text-align: center;
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
