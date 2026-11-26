import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FROM_DRIFT_TO_TRUST_WITH_ANGULAR } from '@marmicode/cohort/core';
import { cohortRouterHelper } from '@marmicode/shared/router-helpers';
import {
  createBasicPageInfo,
  PageComponent,
  PageSection,
} from '@marmicode/shared/ui';
import {
  TrainingAgenda,
  TrainingBenefits,
  TrainingCallToAction,
  TrainingDescription,
  TrainingFaq,
  TrainingInstructor,
  TrainingRequiredSkills,
  TrainingTestimonials,
} from '@marmicode/training/ui';
import { CohortHero } from './cohort-hero.ng';
import { CohortRouteDiagram } from './cohort-route-diagram.ng';

/**
 * The cohort page is made of the same sections as the workshop pages,
 * plus the route diagram and a closing call to action.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-page',
  imports: [
    CohortHero,
    CohortRouteDiagram,
    PageComponent,
    PageSection,
    TrainingAgenda,
    TrainingBenefits,
    TrainingCallToAction,
    TrainingDescription,
    TrainingFaq,
    TrainingInstructor,
    TrainingRequiredSkills,
    TrainingTestimonials,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <mc-cohort-hero [cohort]="cohort" />
      <mc-training-description [training]="cohort" />
      <mc-page-section sectionTitle="🧭 The workflow you will build">
        <mc-cohort-route-diagram />
      </mc-page-section>
      <mc-training-benefits [training]="cohort" />
      <mc-training-testimonials [training]="cohort" />
      <mc-training-agenda [training]="cohort" />
      <mc-training-required-skills [training]="cohort" />
      <mc-training-instructor [training]="cohort" />
      <mc-training-faq [training]="cohort" />
      <mc-training-call-to-action [training]="cohort" />
    </mc-page>
  `,
})
export class CohortPage {
  protected cohort = FROM_DRIFT_TO_TRUST_WITH_ANGULAR;

  protected pageInfo = createBasicPageInfo({
    title: this.cohort.title,
    /* The description is a long markdown text, while the subheading sums the cohort up. */
    description: this.cohort.subheading.replaceAll('\n', ' '),
    pictureUri: this.cohort.pictureUri,
    path: cohortRouterHelper.detailUrl(this.cohort.id),
  });
}
