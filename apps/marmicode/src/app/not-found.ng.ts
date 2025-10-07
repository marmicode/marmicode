import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorComponent, PageComponent } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-not-found',
  imports: [ErrorComponent, PageComponent],
  template: `<mc-page>
    <mc-error>Oups! The page pot is empty.</mc-error>
  </mc-page>`,
})
export default class NotFound {}
