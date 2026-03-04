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
        [class.small]="size() === 'small'"
        [class.white]="color() === 'white'"
        [href]="computedHref()"
        (click)="stopPropagation($event)"
        rel="noopener"
        target="_blank"
      >
        <ng-container *ngTemplateOutlet="templateRef"></ng-container>
      </a>
    } @else if (computedRoute()) {
      <a
        [class.small]="size() === 'small'"
        [class.white]="color() === 'white'"
        [routerLink]="computedRoute()"
        (click)="stopPropagation($event)"
      >
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

      &.small {
        font-size: 0.9rem;
        line-height: 0.9;
      }

      &.white {
        color: white;
      }
    }
  `,
})
export class LinkComponent {
  color = input<'accent' | 'white'>('accent');
  link = input<Link>();
  href = input<string>();
  route = input<string[]>();
  size = input<'small' | 'medium'>('medium');

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
