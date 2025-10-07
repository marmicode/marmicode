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
                  <p class="type">{{ event.type }}</p>
                  <p class="date">
                    @if (event.endDate) {
                      {{ event.startDate | date: 'MMM d' }} to
                      {{ event.endDate | date }}
                    } @else {
                      {{ event.startDate | date }}
                    }
                    · {{ event.startTime }}
                    {{ event.timezone }}
                  </p>
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

      .type {
        margin: 0.5rem 0 0 0;
        font-size: 1.2rem;
        font-weight: 300;
      }

      .date {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 200;
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
        type: workshop.type === 'tapas' ? '🫒 Tapas Session' : '🍽️ Full Course',
        description: workshop.subheading,
        startDate: session.startDate,
        endDate: session.endDate,
        route: workshopRouterHelper.detail(workshop.id),
        startTime: session.startTime,
        timezone: session.timezone,
      })),
    )
    .flat()
    .filter((event) => event.startDate > this._today)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}
