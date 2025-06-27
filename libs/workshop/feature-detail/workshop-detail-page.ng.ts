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
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { WorkshopAgenda } from '@marmicode/workshop/ui';
import { WorkshopBanner } from '@marmicode/workshop/ui';
import { WorkshopBenefits } from '@marmicode/workshop/ui';
import { WorkshopDescription } from '@marmicode/workshop/ui';
import { WorkshopInstructor } from '@marmicode/workshop/ui';
import { WorkshopRequiredSkills } from '@marmicode/workshop/ui';
import { WorkshopSessions } from '@marmicode/workshop/ui';

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
