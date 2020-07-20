import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card-triangle',
  template: `<span class="mc-triangle-text">
    <ng-content></ng-content>
  </span>`,
  styles: [
    `
      :host {
        display: inline-block;
        background: purple;
        color: white;
        font-weight: bold;
        position: absolute;
        text-align: center;
        vertical-align: bottom;
        top: -80px;
        right: -80px;
        transform: rotateZ(45deg);
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
export class ResourceCardTriangleComponent {}

@NgModule({
  declarations: [ResourceCardTriangleComponent],
  exports: [ResourceCardTriangleComponent],
  imports: [CommonModule],
})
export class ResourceCardTriangleModule {}
