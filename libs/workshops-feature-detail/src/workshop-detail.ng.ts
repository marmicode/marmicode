import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared-ui';
import { WorkshopBanner } from './workshop-banner.ng';
import { WorkshopBenefits } from './workshop-benefits.ng';
import { WorkshopPrerequisites } from './workshop-prerequisites.ng';
import { WorkshopAgenda } from './workshop-agenda.ng';
import { WorkshopInstructor } from './workshop-instructor.ng';

import pragmaticAngularTestingPictureUri from './workshops/pragmatic-angular-testing.png';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-detail-page',
  standalone: true,
  imports: [
    PageComponent,
    WorkshopBanner,
    WorkshopBenefits,
    WorkshopPrerequisites,
    WorkshopAgenda,
    WorkshopInstructor,
  ],
  template: `
    <mc-page [info]="info()">
      <mc-workshop-banner
        [pictureUri]="workshop().pictureUri"
        [title]="workshop().title"
      />
      <mc-workshop-benefits />
      <mc-workshop-prerequisites />
      <mc-workshop-agenda />
      <mc-workshop-instructor />
    </mc-page>
  `,
})
export class WorkshopDetailPage {
  workshop = signal({
    title: 'Pragmatic Angular Testing Workshop',
    pictureUri: pragmaticAngularTestingPictureUri,
  });
  info = computed(() =>
    createBasicPageInfo({
      title: this.workshop().title,
      pictureUri: this.workshop().pictureUri,
    }),
  );
}
