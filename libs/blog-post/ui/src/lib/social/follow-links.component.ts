import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AuthorSocialInfo } from './author-social-info';

/**
 * Pills linking to the author's X, Bluesky and LinkedIn profiles (whichever they have).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-follow-links',
  template: `
    @for (link of links(); track link.network) {
      <a
        [attr.aria-label]="link.ariaLabel"
        [href]="link.href"
        rel="noopener"
        target="_blank"
      >
        @switch (link.network) {
          @case ('x') {
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18.1h1.7L6.3 3.8H4.5l13.3 16.3Z"
              />
            </svg>
          }
          @case ('bluesky') {
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 10.8c-1.09-2.11-4.05-6.05-6.8-8C2.57.94 1.56 1.27.9 1.57.14 1.9 0 3.08 0 3.77c0 .69.38 5.65.62 6.48.82 2.74 3.71 3.66 6.39 3.36.13-.02.27-.04.41-.05-.14.02-.27.04-.41.05-3.92.58-7.39 2.01-2.83 7.08 5.01 5.19 6.87-1.11 7.82-4.31.95 3.2 2.05 9.27 7.73 4.31 4.27-4.31 1.17-6.5-2.74-7.08a8.7 8.7 0 0 1-.41-.05c.14.02.28.03.41.05 2.67.3 5.57-.62 6.39-3.36.24-.83.62-5.79.62-6.48 0-.69-.14-1.86-.9-2.2-.66-.3-1.67-.62-4.3 1.24C16.05 4.75 13.09 8.69 12 10.8Z"
              />
            </svg>
          }
          @case ('linkedin') {
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
              />
            </svg>
          }
        }
        <span>{{ link.label }}</span>
      </a>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      color: var(--mc-dark-muted);
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      transition:
        color 0.2s,
        border-color 0.2s;
    }

    a:hover {
      border-color: rgba(var(--mc-accent-rgb), 0.5);
      color: var(--mc-dark-text);
    }

    a:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    svg {
      flex: none;
      width: 1em;
      height: 1em;
      fill: currentColor;
    }
  `,
})
export class FollowLinks {
  readonly author = input.required<AuthorSocialInfo>();

  protected readonly links = computed(() => {
    const { name, twitter, bluesky, linkedin } = this.author();
    return [
      twitter && {
        network: 'x',
        href: `https://x.com/${twitter}`,
        label: `@${twitter}`,
        ariaLabel: `Follow ${name} on X`,
      },
      bluesky && {
        network: 'bluesky',
        href: `https://bsky.app/profile/${bluesky}`,
        label: `@${bluesky}`,
        ariaLabel: `Follow ${name} on Bluesky`,
      },
      linkedin && {
        network: 'linkedin',
        href: `https://www.linkedin.com/in/${linkedin}`,
        label: 'LinkedIn',
        ariaLabel: `Follow ${name} on LinkedIn`,
      },
    ].filter((link) => !!link);
  });
}
