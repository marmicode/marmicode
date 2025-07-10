import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-landing-page',
  imports: [PageComponent],
  template: ` <mc-page [info]="pageInfo"> </mc-page> `,
})
export class LandingPage {
  pageInfo = createBasicPageInfo({
    title: 'Cook better apps with Marmicode',
  });
}
