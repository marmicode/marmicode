import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthorSocialInfo } from './author-social-info';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-follow-button',
  template: `
    <!-- Twitter follow button. -->
    @if (author.twitter) {
      <a [href]="'https://twitter.com/' + author.twitter" target="_blank">
        <button class="button">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18.1h1.7L6.3 3.8H4.5l13.3 16.3Z"
            />
          </svg>
          <span>Follow &#64;{{ author.twitter }}</span>
        </button>
      </a>
    }
  `,
  styles: [
    `
      /* A pill, as the prototype's follow links. */
      a {
        display: inline-block;
        border-radius: 999px;
        text-decoration: none;
      }

      a:focus-visible {
        outline: 2px solid var(--mc-accent);
        outline-offset: 2px;
      }

      .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;

        cursor: pointer;
        padding: 6px 12px;
        border: 1px solid var(--mc-dark-line-strong);
        border-radius: 999px;
        background: transparent;
        color: var(--mc-dark-muted);
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        outline: none;
        transition:
          color 0.2s,
          border-color 0.2s;
      }

      .button:hover {
        border-color: rgba(var(--mc-accent-rgb), 0.5);
        color: var(--mc-dark-text);
      }

      .icon {
        width: 1em;
        height: 1em;
        margin-right: 5px;
        fill: currentColor;
      }
    `,
  ],
})
export class FollowButtonComponent {
  @Input()
  author!: AuthorSocialInfo;
}
