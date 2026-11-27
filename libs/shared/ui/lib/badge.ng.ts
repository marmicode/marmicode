import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Small pill: 'highlight' = gradient ("New", "Early bird"), 'outline' = bordered (duration, language),
 * 'accent' = accent text and border (next session).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-badge',
  host: {
    '[class.highlight]': "variant() === 'highlight'",
    '[class.accent]': "variant() === 'accent'",
  },
  template: `<ng-content />`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 9px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      color: var(--mc-dark-muted);
      font-size: 12px;
      line-height: 1.4;
      white-space: nowrap;
    }

    :host(.accent) {
      border-color: rgba(var(--mc-accent-rgb), 0.45);
      color: var(--mc-accent);
    }

    :host(.highlight) {
      border-color: transparent;
      background: var(--mc-gradient);
      color: var(--mc-dark-bg);
      font-weight: 600;
    }
  `,
})
export class Badge {
  variant = input<'highlight' | 'outline' | 'accent'>('outline');
}
