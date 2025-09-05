import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { Card, LinkComponent, PageSection } from '@marmicode/shared/ui';
import { WorkshopRepository } from '@marmicode/workshop/infra';

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
    DatePipe,
  ],
  template: `
    @if (events.length > 0) {
      <mc-page-section pageTitle="🗓️ Upcoming Events" color="surface">
        <div class="container">
          @for (event of events; track event) {
            <mc-card>
              <div slot="title" class="header">
                <mat-icon class="icon mc-hide mc-show-gt-xs">event</mat-icon>
                <div>
                  <h3 class="title">{{ event.title }}</h3>
                  <div class="date">
                    {{ event.date | date }} · {{ event.startTime }}
                    {{ event.timezone }}
                  </div>
                </div>
              </div>
              <ng-container slot="content">
                <p>{{ event.description }}</p>
                <mc-link [route]="event.route">
                  <button mat-stroked-button color="primary">
                    SHOW DETAILS
                  </button>
                </mc-link>
              </ng-container>
            </mc-card>
          }
        </div>
      </mc-page-section>
    }
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
export class UpcomingEvents {
  private _today = new Date();
  events = inject(WorkshopRepository)
    .getWorkshops()
    .map((workshop) =>
      workshop.sessions.map((session) => ({
        title: workshop.title,
        description: workshop.subheading,
        date: session.date,
        route: workshopRouterHelper.detail(workshop.id),
        startTime: session.startTime,
        timezone: session.timezone,
      })),
    )
    .flat()
    .filter((event) => event.date > this._today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
