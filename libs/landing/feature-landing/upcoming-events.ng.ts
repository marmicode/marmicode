import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LinkComponent, PageSection, Card } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-upcoming-events',
  imports: [
    PageSection,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LinkComponent,
    Card,
  ],
  template: `
    <mc-page-section pageTitle="🗓️ Upcoming Events" color="surface">
      <div class="container">
        <mc-card>
          <div slot="title" class="header">
            <mat-icon class="icon">event</mat-icon>
            <div>
              <h3 class="title">Angular Testing — Tapas Edition</h3>
              <div class="date">July 15, 2024</div>
            </div>
          </div>
          <ng-container slot="content">
            <p>
              Hands-on workshop to master Angular testing, with live coding and
              Q&A. Limited seats!
            </p>
            <mc-link href="https://marmicode.eventbrite.com">
              <button mat-stroked-button color="primary">VIEW DETAILS</button>
            </mc-link>
          </ng-container>
        </mc-card>

        <mc-card>
          <div slot="title" class="header">
            <mat-icon class="icon">event</mat-icon>
            <div>
              <h3 class="title">Angular Testing — Tapas Edition</h3>
              <div class="date">July 15, 2024</div>
            </div>
          </div>
          <ng-container slot="content">
            <p>
              Hands-on workshop to master Angular testing, with live coding and
              Q&A. Limited seats!
            </p>
            <mc-link href="https://marmicode.eventbrite.com">
              <button mat-stroked-button color="primary">JOIN WAITLIST</button>
            </mc-link>
          </ng-container>
        </mc-card>
      </div>
    </mc-page-section>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2.5rem;

        margin: 3rem 0;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .icon {
        color: white;
        transform: scale(2);
      }

      .title {
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0;
      }

      .date {
        color: #46d9cf;
        font-size: 1.3rem;
        font-weight: 400;
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
    `,
  ],
})
export class UpcomingEvents {}
