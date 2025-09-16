import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  NgModule,
} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-link',
  imports: [NgTemplateOutlet, RouterLink],
  template: `
    @if (computedHref()) {
      <a
        [href]="computedHref()"
        rel="noopener"
        target="_blank"
        (click)="stopPropagation($event)"
      >
        <ng-container *ngTemplateOutlet="templateRef"></ng-container>
      </a>
    } @else if (computedRoute()) {
      <a [routerLink]="computedRoute()" (click)="stopPropagation($event)">
        <ng-container *ngTemplateOutlet="templateRef"></ng-container>
      </a>
    } @else {
      <ng-container *ngTemplateOutlet="templateRef"></ng-container>
    }

    <ng-template #templateRef>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: `
    a {
      color: var(--marmicode-accent-color);
      text-decoration: none;
    }
  `,
})
export class LinkComponent {
  link = input<Link>();
  href = input<string>();
  route = input<string[]>();

  computedHref = computed(() => {
    const link = this.link();
    return link && 'href' in link ? link.href : this.href();
  });
  computedRoute = computed(() => {
    const link = this.link();
    return link && 'route' in link ? link.route : this.route();
  });

  /**
   * Stop propagation of the event to avoid double navigation.
   * There are rare occurrences of links or tags inside cards
   * where cards are also clickable for convenience.
   */
  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}

export type Link = { href: string } | { route: string[] };

@NgModule({
  exports: [LinkComponent],
  imports: [CommonModule, RouterModule, LinkComponent],
})
export class LinkModule {}
