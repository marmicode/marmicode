import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  createBasicPageInfo,
  ErrorComponent,
  PageComponent,
} from '@marmicode/shared-ui';
import { WorkshopRepository } from './infra/workshop-repository';
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
      @let workshop = this.workshop();
      @if (workshop) {
        <mc-workshop-banner [workshop]="workshop" />
        <mc-workshop-description [description]="workshop.description" />
        <mc-workshop-sessions [workshop]="workshop" />
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
  workshop = computed(() =>
    this._workshopRepository.findWorkshop(this.workshopId()),
  );
  info = computed(() =>
    createBasicPageInfo({
      title: this.workshop()?.title,
      pictureUri: this.workshop()?.pictureUri,
    }),
  );

  private _workshopRepository = inject(WorkshopRepository);
}
