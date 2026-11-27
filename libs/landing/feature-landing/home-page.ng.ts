import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { externalLinks } from '@marmicode/shared/router-helpers';
import {
  Button,
  ClosingSection,
  CookCard,
  createBasicPageInfo,
  PageComponent,
} from '@marmicode/shared/ui';
import { TODAY } from '@marmicode/shared/utils';
import { getUpcomingSessions } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { HomeHero } from './home-hero.ng';
import { HomeTiles } from './home-tiles.ng';
import { UpcomingSessionList } from './upcoming-session-list.ng';

/**
 * Dark home page: hero, tiles, upcoming events, the cook and the contact section.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-home-page',
  imports: [
    Button,
    ClosingSection,
    CookCard,
    HomeHero,
    HomeTiles,
    PageComponent,
    UpcomingSessionList,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <mc-home-hero class="wrap" />

      <section class="wrap tiles-section">
        <span class="mc-eyebrow">// what's cooking</span>
        <h2>Pick what you're hungry for.</h2>
        <mc-home-tiles />
      </section>

      <section class="wrap">
        <span class="mc-eyebrow">// on the stove</span>
        <h2>Upcoming events</h2>
        <mc-upcoming-session-list [sessions]="upcomingSessions" />
      </section>

      <section class="wrap">
        <mc-cook-card />
      </section>

      <section class="wrap contact-section">
        <mc-closing-section
          eyebrow="// contact"
          description="Workshop, coaching, or just a question — I usually reply within a day."
        >
          Let's cook something <span class="mc-gradient-text">together.</span>
          <a
            mcButton
            slot="actions"
            [href]="externalLinks.contactFormUrl"
            rel="noopener"
            target="_blank"
          >
            Contact me
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </mc-closing-section>
      </section>
    </mc-page>
  `,
  styles: `
    .wrap {
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    section {
      padding: 72px 0;
    }

    .tiles-section {
      padding-top: 48px;
    }

    .contact-section {
      padding-bottom: 120px;
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

    h2 {
      margin: 10px 0 0;
      font-size: clamp(30px, 4vw, 46px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }
  `,
})
export class HomePage {
  protected readonly externalLinks = externalLinks;
  protected readonly upcomingSessions = getUpcomingSessions({
    workshops: inject(WorkshopRepository).getWorkshops(),
    today: inject(TODAY)(),
  }).slice(0, MAX_UPCOMING_SESSIONS);

  pageInfo = createBasicPageInfo({
    title: 'Trust, baked in',
    description:
      'Workshops, courses, and coaching to help you build better Angular apps. Learn from a Google Developer Expert and eXtreme Programming coach.',
  });
}

const MAX_UPCOMING_SESSIONS = 5;
