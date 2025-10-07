import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { Card, LinkComponent, PageSection } from '@marmicode/shared/ui';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { WorkshopTypeLabel } from '@marmicode/workshop/ui';

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
    WorkshopTypeLabel,
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
                  <h3 class="title">{{ event.workshop.title }}</h3>
                  <p class="type">
                    <mc-workshop-type-label [workshop]="event.workshop" />
                  </p>
                  <p class="date">
                    @if (event.session.endDate) {
                      {{ event.session.startDate | date: 'MMM d' }} to
                      {{ event.session.endDate | date }}
                    } @else {
                      {{ event.session.startDate | date }}
                    }
                    · {{ event.session.startTime }}
                    {{ event.session.timezone }}
                  </p>
                </div>
              </div>
              <ng-container slot="content">
                <p>{{ event.workshop.subheading }}</p>
                <mc-link [route]="event.workshopRoute">
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
        margin: 0 0 0.2rem 0;
        font-size: 1.1rem;
        font-style: italic;
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
        session,
        workshop,
        workshopRoute: workshopRouterHelper.detail(workshop.id),
      })),
    )
    .flat()
    .filter((event) => event.session.startDate > this._today)
    .sort(
      (a, b) => a.session.startDate.getTime() - b.session.startDate.getTime(),
    );
}
