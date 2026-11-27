import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Big centered closing section with a glow: eyebrow, projected heading (may use `.mc-gradient-text`),
 * description, and projected actions (`[slot=actions]`).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-closing-section',
  template: `
    <section>
      @if (eyebrow()) {
        <span class="mc-eyebrow">{{ eyebrow() }}</span>
      }
      <h2><ng-content /></h2>
      @if (description()) {
        <p>{{ description() }}</p>
      }
      <div class="actions">
        <ng-content select="[slot=actions]" />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    section {
      padding: clamp(40px, 7vw, 88px) clamp(20px, 5vw, 56px);
      border: 1px solid var(--mc-dark-line);
      border-radius: 28px;
      background:
        radial-gradient(
          60% 90% at 50% 0%,
          rgba(var(--mc-violet-rgb), 0.3),
          transparent 65%
        ),
        radial-gradient(
          50% 80% at 50% 100%,
          rgba(var(--mc-accent-rgb), 0.14),
          transparent 65%
        ),
        var(--mc-dark-surface);
      text-align: center;
    }

    h2 {
      max-width: 18ch;
      margin: 10px auto 18px;
      font-size: clamp(36px, 6vw, 72px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }

    p {
      max-width: 58ch;
      margin: 0 auto 32px;
      color: var(--mc-dark-muted);
      font-size: 17px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }
  `,
})
export class ClosingSection {
  eyebrow = input<string>();
  description = input<string>();
}
