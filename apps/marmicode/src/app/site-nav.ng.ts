import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  coachingRouterHelper,
  externalLinks,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { appRouterHelper } from './app-router-helper';

/**
 * Floating, rounded, frosted nav bar: logo, Library, Training, Coaching and a "Contact me" button.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-site-nav',
  imports: [RouterLink],
  template: `
    <header class="nav">
      <div class="bar">
        <a class="brand" [routerLink]="appRouterHelper.home()">
          <img alt="Marmicode" height="30" src="/assets/logo-white.svg" />
          <span aria-hidden="true">Marmicode</span>
        </a>
        <nav class="links">
          @for (entry of entries; track entry.label) {
            <a [routerLink]="entry.route">{{ entry.label }}</a>
          }
        </nav>
        <a
          class="cta"
          [href]="externalLinks.contactFormUrl"
          rel="noopener"
          target="_blank"
          >Contact<span class="long"> me</span></a
        >
      </div>
    </header>
  `,
  styles: `
    .nav {
      position: fixed;
      top: 14px;
      left: 0;
      right: 0;
      z-index: 20;
      font-family: var(--mc-font-sans);
      line-height: 1.55;
    }

    .bar {
      display: flex;
      align-items: center;
      gap: 6px;
      width: min(760px, 100% - 24px);
      margin-inline: auto;
      padding: 7px 7px 7px 14px;
      box-sizing: border-box;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      background: rgba(26, 17, 32, 0.66);
      backdrop-filter: blur(16px) saturate(150%);
      -webkit-backdrop-filter: blur(16px) saturate(150%);
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-right: auto;
      color: var(--mc-dark-text);
      font-weight: 600;
    }

    .links {
      display: flex;
      gap: 2px;
    }

    .links a {
      padding: 8px 14px;
      border-radius: 999px;
      color: var(--mc-dark-muted);
      font-size: 14px;
      font-weight: 500;
      transition:
        color 0.2s,
        background 0.2s;
    }

    .links a:hover {
      color: var(--mc-dark-text);
      background: rgba(255, 255, 255, 0.06);
    }

    .cta {
      padding: 9px 16px;
      border-radius: 999px;
      background: var(--mc-dark-text);
      color: var(--mc-dark-bg);
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      transition: background 0.2s;
    }

    .cta:hover {
      background: var(--mc-accent-bright);
    }
  `,
})
export class SiteNav {
  protected readonly appRouterHelper = appRouterHelper;
  protected readonly externalLinks = externalLinks;
  protected readonly entries = [
    { label: 'Library', route: resourceSearchRouterHelper.learnEverything() },
    { label: 'Training', route: workshopRouterHelper.list() },
    { label: 'Coaching', route: coachingRouterHelper.coaching() },
  ];
}
