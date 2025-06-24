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
  ],
  template: `
    <mc-page [info]="info()">
      <mc-workshop-banner [workshop]="workshop()" />
      <mc-workshop-description [description]="workshop().description" />
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
}
