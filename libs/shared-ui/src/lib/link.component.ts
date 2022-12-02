import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-link',
  template: `<a *ngIf="href" [href]="href" rel="noopener" target="_blank">
      <ng-container *ngTemplateOutlet="templateRef"></ng-container>
    </a>

    <a *ngIf="route" [routerLink]="route">
      <ng-container *ngTemplateOutlet="templateRef"></ng-container>
    </a>

    <ng-template #templateRef>
      <ng-content></ng-content>
    </ng-template> `,
  styles: [
    `
        a {
            text-decoration: none;
        }
    `
  ]
})
export class LinkComponent {
  @Input() href: string;
  @Input() route: string[];
}

@NgModule({
  declarations: [LinkComponent],
  exports: [LinkComponent],
  imports: [CommonModule, RouterModule],
})
export class LinkModule {}
