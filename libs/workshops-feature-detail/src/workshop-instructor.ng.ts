import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-instructor',
  imports: [MatCardModule],
  template: `
    <mat-card class="card">
      <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
        alt="Photo of a Shiba Inu"
      />
      <mat-card-content>
        <h3>Younes Jaaidi</h3>
        <p>
          bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      padding: 2rem;

      background-color: white;
    }

    .card {
      width: 400px;

      h3 {
        font-weight: 700;
        font-size: 24px; /* Adjust depending on context */
        color: #111827; /* near-black */
        line-height: 1.4;
        margin-top: 1rem;
        text-align: center;
      }

      p {
        font-weight: 400;
        font-size: 16px;
        color: #6b7280; /* dark gray */
        line-height: 1.6;
      }
    }
  `,
})
export class WorkshopInstructor {}
