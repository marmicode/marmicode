import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  createBasicPageInfo,
  ErrorComponent,
  PageComponent,
} from '@marmicode/shared-ui';
import { Workshop } from './core/workshop';
import { WorkshopRepository } from './infra/workshop-repository';
import { pragmaticAngularTesting } from './infra/workshops/pragmatic-angular-testing';
import { WorkshopAgenda } from './ui/workshop-agenda.ng';
import { WorkshopBanner } from './ui/workshop-banner.ng';
import { WorkshopBenefits } from './ui/workshop-benefits.ng';
import { WorkshopDescription } from './ui/workshop-description.ng';
import { WorkshopInstructor } from './ui/workshop-instructor.ng';
import { WorkshopRequiredSkills } from './ui/workshop-prerequisites.ng';
import { WorkshopSessions } from './ui/workshop-sessions.ng';

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
    ErrorComponent,
  ],
  template: `
    <mc-page [info]="info()">
      @let workshopAndLinks = this.workshopAndLinks();
      @if (workshopAndLinks) {
        @let workshop = workshopAndLinks.workshop;
        @let waitlistMailtoUrl = workshopAndLinks.waitlistMailtoUrl;

        <mc-workshop-banner
          [workshop]="workshop"
          [waitlistMailtoUrl]="waitlistMailtoUrl"
        />
        <mc-workshop-description [description]="workshop.description" />
        <mc-workshop-sessions
          [sessions]="workshop.sessions"
          [waitlistMailtoUrl]="waitlistMailtoUrl"
        />
        <mc-workshop-benefits [benefits]="workshop.benefits" />
        <mc-workshop-required-skills [skills]="workshop.requiredSkills" />
        <mc-workshop-agenda [agenda]="workshop.agenda" />
        <mc-workshop-instructor />
      } @else {
        <mc-error>
          <p>Workshop not found.</p>
          <p>
            Please check the URL or
            <a href="mailto:kitchen@marmicode.io" target="_blank">contact us</a
            >.
          </p>
        </mc-error>
      }
    </mc-page>
  `,
})
export class WorkshopDetailPage {
  workshopId = input.required<string>();
  workshopAndLinks = computed(() => {
    const workshop = this.workshop();
    if (!workshop) {
      return null;
    }
    return {
      workshop,
      waitlistMailtoUrl: this._computeWaitlistMailtoUrl(workshop),
    };
  });
  info = computed(() =>
    createBasicPageInfo({
      title: this.workshop()?.title,
      pictureUri: this.workshop()?.pictureUri,
    }),
  );
  private _workshopRepository = inject(WorkshopRepository);
  workshop = computed(() =>
    this._workshopRepository.findWorkshop(this.workshopId()),
  );

  private _computeWaitlistMailtoUrl(workshop: Workshop) {
    const url = new URL('mailto:kitchen@marmicode.io');
    url.searchParams.set('subject', `Registration for ${workshop.title}`);
    url.searchParams.set(
      'body',
      `Hi! I'd like to be added to the waitlist for ${workshop.title} (${workshop.type} Session).`,
    );
    return url.toString();
  }
}
