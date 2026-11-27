import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  blogPostDetailRouterHelper,
  coachingRouterHelper,
  cohortRouterHelper,
  externalLinks,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { filter, map } from 'rxjs';
import { appRouterHelper } from './app-router-helper';

/**
 * Floating, rounded, frosted nav bar: logo, Library, Training, Coaching and a "Contact me" button.
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
            <a
              [attr.aria-current]="
                entry.label === currentEntryLabel() ? 'page' : null
              "
              [routerLink]="entry.route"
              >{{ entry.label }}</a
            >
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
      /* Sits the wordmark's baseline on the bottom of the pot (the image's bottom edge). */
      align-items: baseline;
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

    .links a[aria-current='page'] {
      color: var(--mc-dark-text);
      background: rgba(255, 255, 255, 0.09);
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

    @media (max-width: 600px) {
      .bar {
        gap: 2px;
        padding-left: 10px;
      }

      .links a {
        padding: 8px 7px;
        font-size: 13px;
      }

      .brand span,
      .cta .long {
        display: none;
      }

      .cta {
        padding: 9px 12px;
        font-size: 13px;
      }
    }
  `,
})
export class SiteNav {
  protected readonly appRouterHelper = appRouterHelper;
  protected readonly externalLinks = externalLinks;
  protected readonly entries: NavEntry[] = [
    {
      label: 'Library',
      route: resourceSearchRouterHelper.learnEverything(),
      sectionPaths: [
        resourceSearchRouterHelper.LEARN_PATH,
        blogPostDetailRouterHelper.BLOG_POST_DETAIL_PATH,
      ],
    },
    {
      label: 'Training',
      route: workshopRouterHelper.list(),
      sectionPaths: [
        workshopRouterHelper.WORKSHOP_LIST_PATH,
        cohortRouterHelper.COHORT_LIST_PATH,
      ],
    },
    {
      label: 'Coaching',
      route: coachingRouterHelper.coaching(),
      sectionPaths: [coachingRouterHelper.COACHING_PATH],
    },
  ];

  private _router = inject(Router);
  private _firstPathSegment = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._getFirstPathSegment()),
    ),
    { initialValue: this._getFirstPathSegment() },
  );

  protected readonly currentEntryLabel = computed(() => {
    const firstPathSegment = this._firstPathSegment();
    return this.entries.find(
      (entry) =>
        firstPathSegment != null &&
        entry.sectionPaths.includes(firstPathSegment),
    )?.label;
  });

  private _getFirstPathSegment(): string | undefined {
    return this._router.parseUrl(this._router.url).root.children['primary']
      ?.segments[0]?.path;
  }
}

interface NavEntry {
  label: string;
  route: string[];
  /** First URL segments for which this entry is the current section. */
  sectionPaths: string[];
}
