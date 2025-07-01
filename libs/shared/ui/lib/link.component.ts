import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

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
    `,
  ],
  imports: [NgIf, NgTemplateOutlet, RouterLink],
})
export class LinkComponent {
  @Input() href: string;
  @Input() route: string[];
}

@NgModule({
  exports: [LinkComponent],
  imports: [CommonModule, RouterModule, LinkComponent],
})
export class LinkModule {}
