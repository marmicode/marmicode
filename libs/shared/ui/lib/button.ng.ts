import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * `<a mcButton>` / `<button mcButton="ghost">`: gradient primary or outlined ghost.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Attribute selector on native elements, like `button[mat-button]`, so links and buttons keep their semantics.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[mcButton], button[mcButton]',
  host: {
    '[class.ghost]': "variant() === 'ghost'",
  },
  template: `<ng-content />`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 13px 22px;
      border: 1px solid transparent;
      border-radius: 12px;
      background: var(--mc-gradient);
      color: var(--mc-dark-bg);
      font: inherit;
      font-weight: 600;
      line-height: 1.2;
      text-decoration: none;
      cursor: pointer;
      transition:
        transform 0.15s,
        border-color 0.2s;
    }

    :host(:hover) {
      transform: translateY(-1px);
    }

    :host(:focus-visible) {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    :host(.ghost) {
      border-color: var(--mc-dark-line-strong);
      background: rgba(255, 255, 255, 0.03);
      color: var(--mc-dark-text);
    }

    :host(.ghost:hover) {
      border-color: rgba(255, 255, 255, 0.3);
    }
  `,
})
export class Button {
  variant = input('primary', {
    alias: 'mcButton',
    transform: (v: '' | 'primary' | 'ghost') => v || 'primary',
  });
}
