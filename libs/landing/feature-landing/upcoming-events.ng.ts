import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LinkComponent, PageSection } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-upcoming-events',
  imports: [
    PageSection,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LinkComponent,
  ],
  template: `
    <mc-page-section pageTitle="🗓️ Upcoming Events" color="surface">
      <div class="events-cards">
        <mat-card class="event-card">
          <div class="event-header">
            <mat-icon class="event-icon" color="primary">event</mat-icon>
            <div>
              <h3>Angular Testing — Tapas Edition</h3>
              <div class="event-date">July 15, 2024</div>
            </div>
          </div>
          <p>
            Hands-on workshop to master Angular testing, with live coding and
            Q&A. Limited seats!
          </p>
          <mc-link href="https://marmicode.eventbrite.com">
            <button mat-stroked-button color="primary">View Details</button>
          </mc-link>
        </mat-card>
        <mat-card class="event-card">
          <div class="event-header">
            <mat-icon class="event-icon" color="primary">event</mat-icon>
            <div>
              <h3>Monthly Code Review</h3>
              <div class="event-date">August 1, 2024</div>
            </div>
          </div>
          <p>
            Get your code reviewed by an expert. Async, actionable feedback
            for your team or project.
          </p>
          <mc-link href="mailto:kitchen@marmicode.io">
            <button mat-stroked-button color="primary">Book Now</button>
          </mc-link>
        </mat-card>
        <mat-card class="event-card">
          <div class="event-header">
            <mat-icon class="event-icon" color="primary">event</mat-icon>
            <div>
              <h3>Architecture Deep Dive</h3>
              <div class="event-date">September 10, 2024</div>
            </div>
          </div>
          <p>
            Advanced session on scalable frontend and backend architecture.
            For teams and individuals.
          </p>
          <mc-link href="mailto:kitchen@marmicode.io">
            <button mat-stroked-button color="primary">Join Waitlist</button>
          </mc-link>
        </mat-card>
      </div>
    </mc-page-section>
  `,
  styles: [
    `
      .events-cards {
        display: flex;
        flex-direction: row;
        gap: 2.5rem;
        justify-content: center;
        max-width: 1100px;
        margin: 0 auto;
      }

      .event-card {
        flex: 1 1 0;
        min-width: 260px;
        max-width: 340px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: #561f4b;
      }

      .event-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .event-icon {
        font-size: 2.2rem;
        color: #561f4b;
      }

      .event-date {
        font-size: 1rem;
        color: #5db3ad;
        font-weight: 600;
        margin-top: 0.2rem;
      }

      .event-card h3 {
        color: #561f4b;
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
      }

      .event-card p {
        color: #561f4b;
        font-size: 1rem;
        margin-bottom: 1.2rem;
      }

      @media (max-width: 1100px) {
        .events-cards {
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }
      }
    `,
  ],
})
export class UpcomingEvents {}
