import { ChangeDetectionStrategy, Component } from '@angular/core';
import { externalLinks } from '@marmicode/shared/router-helpers';

/**
 * Banner linking to the cookbook in a new tab.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cookbook-banner',
  template: `
    <a [href]="cookbookUrl" rel="noopener" target="_blank">
      <span class="emoji" aria-hidden="true">📖</span>
      <span class="text">
        <b>The Cookbook</b>
        <span class="tag">Free</span>
        <small>
          The sauce (the why), the ingredients (the tools) and the recipes (the
          how) for testing, Angular and Nx.
        </small>
      </span>
      <span class="go">
        Open the cookbook
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </a>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      z-index: 1;
    }

    a {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px 18px;
      overflow: hidden;
      padding: 16px 22px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.35);
      border-radius: 18px;
      background:
        radial-gradient(
          90% 90% at 100% 0%,
          rgba(var(--mc-violet-rgb), 0.38),
          transparent 60%
        ),
        radial-gradient(
          80% 70% at 0% 100%,
          rgba(var(--mc-accent-rgb), 0.2),
          transparent 65%
        ),
        var(--mc-dark-surface);
      color: var(--mc-dark-text);
      text-decoration: none;
      transition:
        border-color 0.25s,
        transform 0.25s;
    }

    a:hover {
      border-color: rgba(var(--mc-accent-rgb), 0.6);
      transform: translateY(-2px);
    }

    a:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    .emoji {
      font-size: 30px;
      line-height: 1;
    }

    .text {
      flex: 1 1 280px;

      b {
        margin-right: 8px;
        font-size: 17px;
        font-weight: 600;
      }

      small {
        display: block;
        margin-top: 2px;
        color: var(--mc-dark-muted);
        font-size: 14px;
      }
    }

    .tag {
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--mc-gradient);
      color: var(--mc-dark-bg);
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }

    .go {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 600;
      white-space: nowrap;

      svg {
        flex: none;
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    a:hover .go {
      color: var(--mc-accent-bright);
    }
  `,
})
export class CookbookBanner {
  protected readonly cookbookUrl = externalLinks.cookbookUrl;
}
