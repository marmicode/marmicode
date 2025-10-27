import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PageSection } from '@marmicode/shared/ui';
import { LumaEvents } from '@marmicode/workshop/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-upcoming-events',
  imports: [
    PageSection,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LumaEvents,
  ],
  template: `
    <mc-page-section pageTitle="🗓️ Upcoming Events" color="grey">
      <mc-luma-events />
    </mc-page-section>
  `,
})
export class UpcomingEvents {}
