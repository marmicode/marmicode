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
} from '@marmicode/shared/ui';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { workshopViewTransitionName } from '@marmicode/workshop/ui';
import {
  WorkshopAgenda,
  WorkshopHero,
  WorkshopBenefits,
  WorkshopDescription,
  WorkshopInstructor,
  WorkshopRequiredSkills,
  WorkshopSessions,
} from '@marmicode/workshop/ui-detail';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-detail-page',
  imports: [
    PageComponent,
    WorkshopAgenda,
    WorkshopBenefits,
    WorkshopDescription,
    WorkshopInstructor,
    WorkshopRequiredSkills,
    WorkshopSessions,
    ErrorComponent,
    WorkshopHero,
  ],
  template: `
    <mc-page [info]="info()">
      @let workshop = this.workshop();
      @if (workshop) {
        <mc-workshop-hero
          [workshop]="workshop"
          [style.view-transition-name]="transitionName()"
        />
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
  transitionName = computed(() => workshopViewTransitionName(this.workshop()));

  private _workshopRepository = inject(WorkshopRepository);
}
