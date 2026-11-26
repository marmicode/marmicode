import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A short status shown in a training's banner, e.g. "NEXT SESSION | JANUARY 2027".
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-hero-pill',
  imports: [UpperCasePipe],
  template: `
    <p class="pill">
      @for (segment of segments(); track segment; let isFirst = $first) {
        @if (!isFirst) {
          <span class="divider" aria-hidden="true"></span>
        }
        <span class="segment">{{ segment | uppercase }}</span>
      }
    </p>
  `,
  styles: `
    :host {
      display: block;
    }

    .pill {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 1.25rem;
      margin: 0 0 1.5rem;
      border: 1px solid
        color-mix(
          in srgb,
          var(--marmicode-accent-bright-color) 20%,
          transparent
        );
      border-radius: 9999px;

      background: rgba(20, 30, 35, 0.35);
      color: var(--marmicode-accent-bright-color);
      font-size: 0.95em;
      letter-spacing: 0.05em;
      text-align: center;

      @media (max-width: 599.98px) {
        gap: 0.6rem;
        padding: 0.6rem 0.8rem;
        margin: 0 0.75rem 1.5rem;
        font-size: 0.95em;
        letter-spacing: 0.02em;
      }
    }

    .segment {
      white-space: nowrap;

      @media (max-width: 599.98px) {
        flex: 1;
        white-space: normal;
      }
    }

    .divider {
      align-self: stretch;
      width: 1px;
      background: color-mix(
        in srgb,
        var(--marmicode-accent-bright-color) 30%,
        transparent
      );
    }
  `,
})
export class TrainingHeroPill {
  segments = input.required<string[]>();
}
