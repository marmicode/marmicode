import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WorkshopSection } from './workshop-section.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-instructor',
  imports: [MatCardModule, WorkshopSection],
  template: `
    <mc-workshop-section title="👨‍🏫 Your Instructor" color="surface">
      <mat-card class="card">
        <img
          mat-card-image
          src="https://cookbook.marmicode.io/img/younes.jpg"
          alt="Photo of Younes Jaaidi"
        />
        <mat-card-content>
          <h3>Younes Jaaidi</h3>
          <p>
            bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
          </p>
        </mat-card-content>
      </mat-card>
    </mc-workshop-section>
  `,
  styles: `
    .card {
      margin: auto;
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
