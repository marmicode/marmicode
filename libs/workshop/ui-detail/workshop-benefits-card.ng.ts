import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Benefit } from '@marmicode/workshop/core';
import { WorkshopCard } from './internal/workshop-card.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-benefit-card',
  imports: [MatCardModule, MatIconModule, WorkshopCard],
  template: `
    <mc-workshop-card [icon]="benefit().icon">
      <ng-container slot="title">{{ benefit().title }}</ng-container>
      <p slot="content">{{ benefit().description }}</p>
    </mc-workshop-card>
  `,
})
export class WorkshopBenefitCard {
  benefit = input.required<Benefit>();
}
