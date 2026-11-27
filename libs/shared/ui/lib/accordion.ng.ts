import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Native `<details>` accordion with plain-text content, like the current FAQ answers.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-accordion',
  template: `
    @for (item of items(); track $index) {
      <details>
        <summary>{{ item.title }}</summary>
        <p>{{ item.content }}</p>
      </details>
    }
  `,
})
export class Accordion {
  items = input.required<Array<{ title: string; content: string }>>();
}
