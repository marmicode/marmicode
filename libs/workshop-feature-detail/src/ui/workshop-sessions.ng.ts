import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Session } from '../core/workshop';
import { WorkshopCard } from './workshop-card.ng';
import { WorkshopSection } from './workshop-section.ng';

@Component({
  selector: 'mc-workshop-sessions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    WorkshopCard,
    WorkshopSection,
  ],
  template: `
    <mc-workshop-section title="🗓️ Upcoming Sessions">
      <div class="sessions">
        @for (session of sessions(); track session.date) {
          <mc-workshop-card>
            <ng-container slot="title">
              🗓️ {{ session.date | date: 'fullDate' }}
            </ng-container>
            <ng-container slot="content">
              <p class="content">
                {{ session.startTime }} — {{ session.endTime }}
                {{ session.timezone }}
              </p>
              <a
                [href]="waitlistMailtoUrl()"
                color="primary"
                mat-stroked-button
                target="_blank"
              >
                JOIN THE WAITLIST
              </a>
            </ng-container>
          </mc-workshop-card>
        }
      </div>
    </mc-workshop-section>
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
  sessions = input.required<Session[]>();
  waitlistMailtoUrl = input.required<string>();
}
