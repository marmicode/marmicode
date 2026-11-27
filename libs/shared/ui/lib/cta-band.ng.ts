import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link, LinkComponent } from './link.component';

/**
 * Closing call-to-action band: 'solid' (newsletter) or 'dashed' (in-house offer).
 * Projected content goes under the description, e.g. a paragraph with a secondary link.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cta-band',
  imports: [LinkComponent],
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
    <mc-link class="action" [link]="link()">{{ linkLabel() }}</mc-link>
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

    /* Same look as mcButton, applied to the link rendered by mc-link. */
    .action ::ng-deep a {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      border-radius: 12px;
      background: var(--mc-gradient);
      color: var(--mc-dark-bg);
      font-weight: 600;
      white-space: nowrap;
      transition: transform 0.15s;
    }

    .action ::ng-deep a:hover {
      transform: translateY(-1px);
    }

    .action ::ng-deep a:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }
  `,
})
export class CtaBand {
  heading = input.required<string>();
  description = input<string>();
  link = input.required<Link>();
  linkLabel = input.required<string>();
  appearance = input<'solid' | 'dashed'>('solid');
}
