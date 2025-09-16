import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  NgModule
} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-link',
  template: `
    @if (computedHref()) {
      <a [href]="computedHref()" rel="noopener" target="_blank">
        <ng-container *ngTemplateOutlet="templateRef"></ng-container>
      </a>
    }

    @if(computedRoute() ) {
      <a [routerLink]="computedRoute()">
        <ng-container *ngTemplateOutlet="templateRef"></ng-container>
      </a>
    }

    <ng-template #templateRef>
      <ng-content></ng-content>
    </ng-template> `,
  styles: [
    `
      a {
        color: var(--marmicode-accent-color);
        text-decoration: none;
      }
    `,
  ],
  imports: [NgTemplateOutlet, RouterLink],
})
export class LinkComponent {
  link = input<{href: string} | {route: string[]}>();
  href = input<string>();
  route = input<string[]>();

  computedHref = computed(() => {
    const link = this.link();
    return (link && 'href' in link) ? link.href : this.href();
  });
  computedRoute = computed(() => {
    const link = this.link();
    return (link && 'route' in link) ? link.route : this.route();
  });
}

@NgModule({
  exports: [LinkComponent],
  imports: [CommonModule, RouterModule, LinkComponent],
})
export class LinkModule {}
