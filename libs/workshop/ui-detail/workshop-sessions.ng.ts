import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Card, PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';

@Component({
  selector: 'mc-workshop-sessions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    Card,
    PageSection,
  ],
  template: `
    <mc-page-section pageTitle="🗓️ Upcoming Sessions">
      <div class="sessions">
        @for (session of workshop().sessions; track session.date) {
          <mc-card>
            <ng-container slot="title">
              🗓️ {{ session.date | date: 'fullDate' }}
            </ng-container>
            <ng-container slot="content">
              <p class="content">
                {{ session.startTime }} — {{ session.endTime }}
                {{ session.timezone }}
              </p>
              <a
                [href]="session.waitlistUrl"
                color="primary"
                mat-stroked-button
                target="_blank"
              >
                JOIN THE WAITLIST
              </a>
            </ng-container>
          </mc-card>
        }
      </div>
    </mc-page-section>
  `,
  styles: `
    .sessions {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      padding: 3rem 0;
    }
  `,
})
export class WorkshopSessions {
  workshop = input.required<Workshop>();
}
