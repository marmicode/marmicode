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
  styles: `
    :host {
      display: grid;
      gap: 10px;
      max-width: 860px;
    }

    details {
      border: 1px solid var(--mc-dark-line);
      border-radius: 16px;
      background: var(--mc-dark-surface);
      transition: border-color 0.2s;
    }

    details[open] {
      border-color: rgba(var(--mc-accent-rgb), 0.4);
    }

    summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 18px 22px;
      font-size: 16.5px;
      font-weight: 600;
      list-style: none;
      cursor: pointer;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary::after {
      content: '+';
      display: grid;
      place-items: center;
      flex: none;
      width: 28px;
      height: 28px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 50%;
      color: var(--mc-accent);
      font-size: 18px;
      font-weight: 400;
      transition: transform 0.2s;
    }

    details[open] summary::after {
      transform: rotate(45deg);
    }

    summary:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: -2px;
      border-radius: 16px;
    }

    p {
      margin: 0;
      padding: 0 22px 20px;
      color: var(--mc-dark-muted);
    }
  `,
})
export class Accordion {
  items = input.required<Array<{ title: string; content: string }>>();
}
