import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared-ui';
import { WorkshopBanner } from './workshop-banner.ng';

// TODO fix this
// @ts-ignore
import pragmaticAngularTestingPictureUri from './workshops/pragmatic-angular-testing.png';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-detail-page',
  standalone: true,
  imports: [PageComponent, WorkshopBanner, MatCard],
  template: `
    <mc-page [info]="info()">
      <mc-workshop-banner
        [pictureUri]="workshop().pictureUri"
        [title]="workshop().title"
      />
    </mc-page>
  `,
})
export class WorkshopDetailPage {
  workshop = signal({
    title: 'Pragmatic Angular Testing Workshop',
    // TODO fix this
    pictureUri: pragmaticAngularTestingPictureUri as string,
  });
  info = computed(() =>
    createBasicPageInfo({
      title: this.workshop().title,
      pictureUri: this.workshop().pictureUri,
    }),
  );
}
