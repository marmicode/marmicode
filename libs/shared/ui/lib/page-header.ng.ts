import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Dark page header: eyebrow label, projected title (may contain `.mc-gradient-text`), description.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-page-header',
  template: `PageHeader - 🚧 work in progress`,
})
export class PageHeader {
  eyebrow = input.required<string>();
  description = input<string>();
}
