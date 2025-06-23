import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Benefit } from './workshop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-benefit-card',
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="card">
      <mat-card-content>
        <div class="icon-container">
          <mat-icon
            class="icon"
            color="primary"
            [fontIcon]="benefit().icon"
          ></mat-icon>
        </div>
        <h3>{{ benefit().title }}</h3>
        <p>
          {{ benefit().description }}
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .card {
      text-align: center;
      transition: box-shadow 0.3s ease-in-out;
      max-width: 500px;

      &:hover {
        box-shadow:
          rgba(0, 0, 0, 0.25) 0px 3px 3px -1px,
          rgba(0, 0, 0, 0.2) 0px 5px 10px 0px;
      }

      h3 {
        font-weight: 700;
        font-size: 24px; /* Adjust depending on context */
        color: #111827; /* near-black */
        line-height: 1.4;
        margin-bottom: 0.5em;
      }

      p {
        font-weight: 400;
        font-size: 16px;
        color: #6b7280; /* dark gray */
        line-height: 1.6;
      }
    }

    .icon-container {
      margin: auto;
      background-color: rgba(121, 34, 108, 0.3);
      width: 50px;
      height: 50px;
      border-radius: 12px;
      margin-bottom: 0.5rem;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      margin: auto;
      transform: scale(1.2);
    }
  `,
})
export class WorkshopBenefitCard {
  benefit = input.required<Benefit>();
}
