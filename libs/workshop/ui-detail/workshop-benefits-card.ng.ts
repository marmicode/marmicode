import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Benefit } from '@marmicode/workshop/core';
import { Card } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-benefit-card',
  imports: [MatCardModule, MatIconModule, Card],
  template: `
    <mc-card [icon]="benefit().icon">
      <ng-container slot="title">{{ benefit().title }}</ng-container>
      <p slot="content">{{ benefit().description }}</p>
    </mc-card>
  `,
})
export class WorkshopBenefitCard {
  benefit = input.required<Benefit>();
}
