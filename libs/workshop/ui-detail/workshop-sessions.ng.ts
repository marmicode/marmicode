import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { LumaEvents } from '@marmicode/workshop/ui';

@Component({
  selector: 'mc-workshop-sessions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PageSection,
    LumaEvents,
  ],
  template: `
    @if (workshop().sessions.length > 0) {
      <mc-page-section pageTitle="🗓️ Upcoming Sessions" color="grey">
        <mc-luma-events [tag]="workshop().lumaTag" />
      </mc-page-section>
    }
  `,
})
export class WorkshopSessions {
  workshop = input.required<Workshop>();
}
