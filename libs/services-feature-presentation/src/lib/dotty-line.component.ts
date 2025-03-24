import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-dotty-line',
    template: `<div
    *ngFor="let line of lines"
    [style.borderBottomColor]="line.color"
    [style.width.px]="line.width"
    class="line"
  ></div>`,
    styles: [
        `
      .line {
        border-bottom: 3px solid;
        display: inline-block;
        margin: 20px 5px;
      }
    `,
    ],
    standalone: true,
    imports: [NgFor],
})
export class DottyLineComponent {
  width = 60;
  lines = [
    {
      color: '#380030',
      width: this.width,
    },
    {
      color: '#600053',
      width: this.width / 2,
    },
    {
      color: '#810070',
      width: this.width / 4,
    },
  ];
}

@NgModule({
    exports: [DottyLineComponent],
    imports: [CommonModule, DottyLineComponent],
})
export class DottyLineModule {}
