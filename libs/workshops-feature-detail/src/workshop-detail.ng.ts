import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PageComponent as Page } from '@marmicode/shared-ui';
import { PageInfo } from 'libs/shared-ui/src/lib/page.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-detail-page',
  imports: [Page],
  template: `<mc-page [info]="info()"> </mc-page>`,
})
export class WorkshopDetailPage {
  info = signal<PageInfo>({
    title: 'Pragmatic Angular Testing - Tapas Workshop',
  });
}
