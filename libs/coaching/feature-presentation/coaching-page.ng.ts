import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COACHING } from '@marmicode/coaching/core';
import { coachingRouterHelper } from '@marmicode/shared/router-helpers';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { CoachingBenefits } from './coaching-benefits.ng';
import { CoachingHero } from './coaching-hero.ng';
import { CoachingPhilosophy } from './coaching-philosophy.ng';
import { CoachingCta } from './coaching-cta.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-page',
  imports: [
    PageComponent,
    CoachingHero,
    CoachingBenefits,
    CoachingPhilosophy,
    CoachingCta,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <mc-coaching-hero [coaching]="coaching" />
      <mc-coaching-benefits [coaching]="coaching" />
      <mc-coaching-philosophy [coaching]="coaching" />
      <mc-coaching-cta [coaching]="coaching" />
    </mc-page>
  `,
})
export class CoachingPage {
  coaching = COACHING;
  pageInfo = createBasicPageInfo({
    title: COACHING.title,
    pictureUri: COACHING.heroPictureUri,
    description: COACHING.description,
    path: coachingRouterHelper.coachingUrl(),
  });
}
