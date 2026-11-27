import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Small pill: 'highlight' = gradient ("New", "Early bird"), 'outline' = bordered (duration, language),
 * 'accent' = accent text and border (next session).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-badge',
  template: `Badge - 🚧 work in progress`,
})
export class Badge {
  variant = input<'highlight' | 'outline' | 'accent'>('outline');
}
