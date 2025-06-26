import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared-ui';
import { WorkshopAgenda } from './workshop-agenda.ng';
import { WorkshopBanner } from './workshop-banner.ng';
import { WorkshopBenefits } from './workshop-benefits.ng';
import { WorkshopDescription } from './workshop-description.ng';
import { WorkshopInstructor } from './workshop-instructor.ng';
import { WorkshopRequiredSkills } from './workshop-prerequisites.ng';
import { WorkshopSessions } from './workshop-sessions.ng';
import { pragmaticAngularTesting } from './workshops/pragmatic-angular-testing';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-detail-page',
  imports: [
    PageComponent,
    WorkshopAgenda,
    WorkshopBanner,
    WorkshopBenefits,
    WorkshopDescription,
    WorkshopInstructor,
    WorkshopRequiredSkills,
    WorkshopSessions,
  ],
  template: `
    <mc-page [info]="info()">
      <mc-workshop-banner
        [workshop]="workshop()"
        [waitlistMailtoUrl]="waitlistMailtoUrl()"
      />
      <mc-workshop-description [description]="workshop().description" />
      <mc-workshop-sessions
        [sessions]="workshop().sessions"
        [waitlistMailtoUrl]="waitlistMailtoUrl()"
      />
      <mc-workshop-benefits [benefits]="workshop().benefits" />
      <mc-workshop-required-skills [skills]="workshop().requiredSkills" />
      <mc-workshop-agenda [agenda]="workshop().agenda" />
      <mc-workshop-instructor />
    </mc-page>
  `,
})
export class WorkshopDetailPage {
  workshop = signal(pragmaticAngularTesting);

  info = computed(() =>
    createBasicPageInfo({
      title: this.workshop().title,
      pictureUri: this.workshop().pictureUri,
    }),
  );

  waitlistMailtoUrl = computed(() => {
    const url = new URL('mailto:kitchen@marmicode.io');
    url.searchParams.set(
      'subject',
      `Registration for ${this.workshop().title}`,
    );
    url.searchParams.set(
      'body',
      `Hi! I'd like to be added to the waitlist for ${this.workshop().title} (${this.workshop().type} Session).`,
    );
    return url.toString();
  });
}
