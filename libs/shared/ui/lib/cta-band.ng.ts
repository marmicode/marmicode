import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from './button.ng';
import { Link } from './link.component';

/**
 * Closing call-to-action band: 'solid' (newsletter) or 'dashed' (in-house offer).
 * Projected content goes under the description, e.g. a paragraph with a secondary link.
 * Without a link, content marked `ctaAction` takes the action's place, e.g. a form.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cta-band',
  imports: [Button, RouterLink],
  host: {
    '[class.dashed]': "appearance() === 'dashed'",
  },
  template: `
    <div class="text">
      <h2>{{ heading() }}</h2>
      @if (description()) {
        <p>{{ description() }}</p>
      }
      <ng-content />
    </div>
    @if (href(); as href) {
      <a class="action" mcButton [href]="href" rel="noopener" target="_blank">
        {{ linkLabel() }}
      </a>
    } @else if (route(); as route) {
      <a class="action" mcButton [routerLink]="route">{{ linkLabel() }}</a>
    } @else {
      <ng-content select="[ctaAction]" />
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 36px;
      border: 1px solid var(--mc-dark-line);
      border-radius: 24px;
      background:
        radial-gradient(
          70% 120% at 100% 50%,
          rgba(var(--mc-accent-rgb), 0.14),
          transparent 60%
        ),
        var(--mc-dark-surface);
      color: var(--mc-dark-text);
    }

    :host(.dashed) {
      padding: 30px;
      border: 1px dashed rgba(var(--mc-accent-rgb), 0.45);
      border-radius: 22px;
      background: rgba(var(--mc-accent-rgb), 0.04);
    }

    h2 {
      margin: 0 0 6px;
      font-size: 24px;
      letter-spacing: -0.025em;
      line-height: 1.2;
    }

    :host(.dashed) h2 {
      font-size: 22px;
      letter-spacing: -0.02em;
    }

    p {
      margin: 0;
      color: var(--mc-dark-muted);
    }

    .action {
      white-space: nowrap;
    }
  `,
})
export class CtaBand {
  heading = input.required<string>();
  description = input<string>();
  link = input<Link>();
  linkLabel = input<string>();
  appearance = input<'solid' | 'dashed'>('solid');

  protected readonly href = computed(() => {
    const link = this.link();
    return link && 'href' in link ? link.href : undefined;
  });
  protected readonly route = computed(() => {
    const link = this.link();
    return link && 'route' in link ? link.route : undefined;
  });
}
