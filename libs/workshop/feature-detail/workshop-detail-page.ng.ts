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
  WorkshopBenefits,
  WorkshopDescription,
  WorkshopFaq,
  WorkshopHero,
  WorkshopInstructor,
  WorkshopRequiredSkills,
  WorkshopSessions,
  WorkshopTestimonials,
} from '@marmicode/workshop/ui-detail';
import {
  externalLinks,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';

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
    WorkshopTestimonials,
    ErrorComponent,
    WorkshopHero,
    WorkshopFaq,
  ],
  template: `
    <mc-page [info]="info()">
      @let workshop = this.workshop();
      @if (workshop) {
        <mc-workshop-hero
          [workshop]="workshop"
          [style.view-transition-name]="transitionName()"
        />
        <mc-workshop-description [workshop]="workshop" />
        <mc-workshop-sessions [workshop]="workshop" />
        <mc-workshop-benefits [workshop]="workshop" />
        <mc-workshop-testimonials [workshop]="workshop" />
        <mc-workshop-agenda [workshop]="workshop" />
        <mc-workshop-required-skills [workshop]="workshop" />
        <mc-workshop-instructor [workshop]="workshop" />
        <mc-workshop-faq [workshop]="workshop" />
      } @else {
        <mc-error>
          <p>Workshop not found.</p>
          <p>
            Please check the URL or
            <a [href]="contactFormUrl" target="_blank">contact us</a>.
          </p>
        </mc-error>
      }
    </mc-page>
  `,
})
export class WorkshopDetailPage {
  workshopId = input.required<string>();

  contactFormUrl = externalLinks.contactFormUrl;
  info = computed(() => {
    const w = this.workshop();

    const allAlternates = w?.alternates
      ? [{ id: w.id, language: w.language }, ...w.alternates]
      : [];

    return createBasicPageInfo({
      title: w?.title,
      pictureUri: w?.pictureUri,
      language: w?.language,
      alternates: allAlternates?.map((alternate) => ({
        path: workshopRouterHelper.detailUrl(alternate.id),
        language: alternate.language,
      })),
      description: w?.description,
    });
  });
  transitionName = computed(() => {
    const w = this.workshop();
    return w ? workshopViewTransitionName(w) : undefined;
  });
  workshop = computed(() =>
    this._workshopRepository.findWorkshop(this.workshopId()),
  );

  private _workshopRepository = inject(WorkshopRepository);
}
