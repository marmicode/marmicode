import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-link',
  template: `<a [href]="href" target="_blank">
    <ng-content></ng-content>
  </a>`,
})
export class LinkComponent {
  @Input() href: string;
}

@NgModule({
  declarations: [LinkComponent],
  exports: [LinkComponent],
  imports: [CommonModule],
})
export class LinkModule {}
