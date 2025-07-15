import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Workshop } from '@marmicode/workshop/core';
import { WaitlistUrlBuilder } from './internal/waitlist-url-builder';
import { WorkshopCard } from './internal/workshop-card.ng';
import { LandingSection } from '@marmicode/shared/ui';

@Component({
  selector: 'mc-workshop-sessions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    WorkshopCard,
    LandingSection,
  ],
  template: `
    <mc-landing-section title="🗓️ Upcoming Sessions">
      <div class="sessions">
        @for (session of sessionsWithMailtoUrl(); track session.date) {
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
                [href]="session.waitlistMailtoUrl"
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
    </mc-landing-section>
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
  private _waitlistUrlBuilder = inject(WaitlistUrlBuilder);
  sessionsWithMailtoUrl = computed(() =>
    this.workshop().sessions.map((session) => ({
      ...session,
      waitlistMailtoUrl: this._waitlistUrlBuilder.generateWaitlistUrl(
        this.workshop(),
        session,
      ),
    })),
  );
}
