import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Native `<details>` accordion with plain-text content, like the current FAQ answers.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-accordion',
  template: `Accordion - 🚧 work in progress`,
})
export class Accordion {
  items = input.required<Array<{ title: string; content: string }>>();
}
