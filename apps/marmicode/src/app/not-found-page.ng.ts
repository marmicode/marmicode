import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  coachingRouterHelper,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { Button, PageComponent } from '@marmicode/shared/ui';

/**
 * Dark not found page: gradient "404", three tiles back to the sections
 * and a link back home.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-not-found-page',
  imports: [Button, PageComponent, RouterLink],
  template: `
    <mc-page>
      <main class="wrap">
        <div>
          <span class="code mc-gradient-text">404</span>
          <h1>Oups! The page pot is empty.</h1>
          <p>
            This recipe isn't on the menu (anymore). Pick something else to
            cook:
          </p>

          <div class="doors">
            @for (door of doors; track door.title) {
              <a
                class="door mc-surface mc-surface-interactive"
                [routerLink]="door.route"
              >
                <span class="ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    @switch (door.icon) {
                      @case ('library') {
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      }
                      @case ('training') {
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      }
                      @case ('coaching') {
                        <circle cx="12" cy="12" r="10" />
                        <polygon
                          points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
                        />
                      }
                    }
                  </svg>
                </span>
                <span>
                  <b>{{ door.title }}</b>
                  <small>{{ door.description }}</small>
                </span>
              </a>
            }
          </div>

          <a mcButton="ghost" routerLink="/">
            Back to the kitchen
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </main>
    </mc-page>
  `,
  styles: `
    .wrap {
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    main {
      display: grid;
      place-items: center;
      min-height: calc(100vh - 80px);
      padding: 48px 0 72px;
      text-align: center;
    }

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

    .code {
      display: block;
      font-family: var(--mc-font-mono);
      font-size: clamp(64px, 14vw, 120px);
      font-weight: 700;
      letter-spacing: -0.06em;
      line-height: 0.9;
    }

    h1 {
      margin: 14px 0 10px;
      font-size: clamp(24px, 3.4vw, 34px);
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 1.2;
    }

    p {
      max-width: 44ch;
      margin: 0 auto 30px;
      color: var(--mc-dark-muted);
    }

    .doors {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      max-width: 720px;
      margin: 0 auto 28px;
      text-align: left;
    }

    @media (max-width: 640px) {
      .doors {
        grid-template-columns: 1fr;
      }
    }

    .door {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px;
      border-radius: 18px;
      color: var(--mc-dark-text);
      text-decoration: none;
    }

    .door:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    .door b {
      display: block;
      font-size: 16px;
    }

    .door small {
      display: block;
      margin-top: 2px;
      color: var(--mc-dark-muted);
      font-size: 13px;
      line-height: 1.4;
    }

    .ico {
      display: grid;
      place-items: center;
      flex: none;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.28);
      border-radius: 12px;
      background: rgba(var(--mc-accent-rgb), 0.12);
      color: var(--mc-accent-bright);
    }

    .ico svg {
      width: 20px;
      height: 20px;
    }
  `,
})
export class NotFoundPage {
  protected readonly doors = [
    {
      icon: 'library',
      title: 'Library',
      description: 'Articles, videos & the cookbook',
      route: resourceSearchRouterHelper.learnEverything(),
    },
    {
      icon: 'training',
      title: 'Training',
      description: 'Cohort, workshops & course',
      route: workshopRouterHelper.list(),
    },
    {
      icon: 'coaching',
      title: 'Coaching',
      description: 'Monthly team partnership',
      route: coachingRouterHelper.coaching(),
    },
  ] as const;
}
