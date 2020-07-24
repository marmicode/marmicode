import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-triangle',
  template: `<span class="mc-triangle-text">
    <ng-content></ng-content>
  </span>`,
  styles: [
    `
      :host {
        display: inline-block;
        color: white;
        font-weight: bold;
        position: absolute;
        text-align: center;
        vertical-align: bottom;
        transform: rotateZ(45deg);
        text-transform: uppercase;
        top: -80px;
        right: -80px;
        height: 160px;
        width: 160px;
      }

      .mc-triangle-text {
        position: absolute;
        width: 100%;
        bottom: 5px;
        left: 0;
      }
    `,
  ],
})
export class TriangleComponent {
  @HostBinding('style.background')
  @Input()
  color: string;
}

@NgModule({
  declarations: [TriangleComponent],
  exports: [TriangleComponent],
  imports: [CommonModule],
})
export class ResourceCardTriangleModule {}
