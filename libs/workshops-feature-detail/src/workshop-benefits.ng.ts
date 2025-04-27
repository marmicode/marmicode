import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkshopBenefitsCard } from './workshop-benefits-card.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-benefits',
  imports: [WorkshopBenefitsCard],
  template: `
    <mc-workshop-benefits-card />
    <mc-workshop-benefits-card />
    <mc-workshop-benefits-card />
    <mc-workshop-benefits-card />
    <mc-workshop-benefits-card />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      padding: 2rem;

      background-color: rgb(249, 250, 251);
    }
  `,
})
export class WorkshopBenefits {}
