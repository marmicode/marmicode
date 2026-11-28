import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
  signal,
} from '@angular/core';

/**
 * Pill that copies the current page's URL (without query or hash), then shows "Copied" for a moment.
 * Developers share by pasting links in Slack, Discord, GitHub or Reddit, not through share buttons.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-copy-link-button',
  template: `
    <button type="button" (click)="copy()">
      @if (isCopied()) {
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        Copied
      } @else {
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          />
          <path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          />
        </svg>
        Copy link
      }
    </button>
    <span class="visually-hidden" aria-live="polite">
      {{ isCopied() ? 'Link copied to clipboard' : '' }}
    </span>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      background: transparent;
      color: var(--mc-dark-muted);
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition:
        color 0.2s,
        border-color 0.2s;
    }

    button:hover {
      border-color: rgba(var(--mc-accent-rgb), 0.5);
      color: var(--mc-dark-text);
    }

    button:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    svg {
      flex: none;
      width: 15px;
      height: 15px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `,
})
export class CopyLinkButton {
  readonly linkCopied = output<void>();

  protected readonly isCopied = signal(false);

  private readonly _document = inject(DOCUMENT);
  private _resetTimeout?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this._resetTimeout));
  }

  protected async copy() {
    const { origin, pathname } = this._document.location;
    try {
      await this._document.defaultView?.navigator.clipboard.writeText(
        origin + pathname,
      );
    } catch {
      /* Clipboard denied: nothing copied, so don't claim it was. */
      return;
    }

    this.isCopied.set(true);
    this.linkCopied.emit();
    clearTimeout(this._resetTimeout);
    this._resetTimeout = setTimeout(() => this.isCopied.set(false), 2000);
  }
}
