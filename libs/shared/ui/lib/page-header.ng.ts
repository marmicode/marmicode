import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Dark page header: eyebrow label, projected title (may contain `.mc-gradient-text`), description.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-page-header',
  template: `
    <header>
      <span class="mc-eyebrow">{{ eyebrow() }}</span>
      <h1><ng-content /></h1>
      @if (description()) {
        <p>{{ description() }}</p>
      }
    </header>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      z-index: 1;
      /* Leaves room for the floating nav. */
      padding: 150px 0 36px;
    }

    h1 {
      max-width: 18ch;
      margin: 14px 0 16px;
      font-size: clamp(40px, 6vw, 68px);
      font-weight: 700;
      letter-spacing: -0.045em;
      line-height: 1;
    }

    p {
      max-width: 56ch;
      margin: 0;
      color: var(--mc-dark-muted);
      font-size: clamp(17px, 2vw, 19px);
    }
  `,
})
export class PageHeader {
  eyebrow = input.required<string>();
  description = input<string>();
}
