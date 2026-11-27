import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COACHING } from '@marmicode/coaching/core';
import {
  coachingRouterHelper,
  externalLinks,
} from '@marmicode/shared/router-helpers';
import {
  Badge,
  Button,
  ClosingSection,
  createBasicPageInfo,
  NewsletterBand,
  PageComponent,
} from '@marmicode/shared/ui';
import { COACHING_LABELS } from './coaching-presentation.i18n';
import { CoachingRhythm } from './coaching-rhythm.ng';

/**
 * Dark coaching page: hero with the coach picture, benefit tiles, the monthly rhythm and closing section.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-landing-page',
  imports: [
    Badge,
    Button,
    ClosingSection,
    CoachingRhythm,
    NewsletterBand,
    PageComponent,
    RouterLink,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <header class="wrap hero">
        <div>
          <span class="mc-eyebrow">// {{ labels.heroEyebrow }}</span>
          <h1>
            {{ title.start }}
            <span class="mc-gradient-text">{{ title.end }}</span>
          </h1>
          <mc-badge variant="highlight">{{ coaching.priceLabel }}</mc-badge>
          <p class="description">{{ coaching.description }}</p>
          <div class="actions">
            <a
              mcButton
              [href]="coaching.bookCallUrl"
              rel="noopener"
              target="_blank"
            >
              {{ labels.bookFitCall }}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a mcButton="ghost" [routerLink]="[]" fragment="how">
              {{ labels.howItWorks }}
            </a>
          </div>
        </div>

        <figure class="portrait">
          <img
            [alt]="labels.coachPictureAltText"
            [src]="coaching.heroPictureUri"
          />
          <figcaption class="card">
            <b>{{ labels.coachName }}</b>
            <span>{{ labels.coachRole }}</span>
          </figcaption>
        </figure>
      </header>

      <section id="benefits" class="wrap">
        <span class="mc-eyebrow">// {{ labels.benefitsEyebrow }}</span>
        <h2>{{ labels.benefitsTitle }}</h2>
        <ul class="benefits">
          @for (benefit of benefits; track $index) {
            <li class="benefit mc-surface">
              <span class="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  @switch ($index) {
                    @case (0) {
                      <circle cx="12" cy="12" r="10" />
                      <polygon
                        points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
                      />
                    }
                    @case (1) {
                      <path
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      />
                    }
                    @default {
                      <path
                        d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                      />
                      <path d="M14 3v6h6M8 13h8M8 17h5" />
                    }
                  }
                </svg>
              </span>
              <h3>{{ benefit.headline }}</h3>
              <p>{{ benefit.detail }}</p>
            </li>
          }
        </ul>
      </section>

      <section id="how" class="wrap">
        <mc-coaching-rhythm [coaching]="coaching" />
      </section>

      <section class="wrap">
        <mc-newsletter-band
          description="Articles and videos on keeping the bar high with coding agents. No spam, just the sauce."
          heading="Not ready for a call yet?"
          source="coaching"
        />
      </section>

      <section class="wrap closing">
        <mc-closing-section
          [description]="coaching.ctaDescription"
          [eyebrow]="'// ' + labels.closingEyebrow"
        >
          {{ ctaTitle.start }}
          <span class="mc-gradient-text">{{ ctaTitle.end }}</span>
          <a
            mcButton
            slot="actions"
            [href]="coaching.bookCallUrl"
            rel="noopener"
            target="_blank"
          >
            {{ labels.bookFitCall }}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            mcButton="ghost"
            slot="actions"
            [href]="contactFormUrl"
            rel="noopener"
            target="_blank"
          >
            {{ labels.askAQuestionFirst }}
          </a>
          <p slot="actions" class="price-line">{{ coaching.priceLabel }}</p>
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
      position: relative;
      padding: 24px 0 72px;
    }

    /* Hero: copy on the left, the coach on the right. */
    .hero {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      gap: 56px;
      align-items: center;
      /* The shell already leaves 80px for the floating nav. */
      padding: 60px 0 40px;
    }

    h1 {
      margin: 14px 0 18px;
      font-size: clamp(42px, 6.4vw, 76px);
      font-weight: 700;
      letter-spacing: -0.045em;
      line-height: 0.98;
    }

    .hero mc-badge {
      padding: 5px 12px;
      font-size: 13px;
    }

    .description {
      max-width: 50ch;
      margin: 18px 0 30px;
      color: var(--mc-dark-muted);
      font-size: clamp(17px, 2vw, 19px);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .portrait {
      position: relative;
      margin: 0;
    }

    .portrait img {
      display: block;
      width: 100%;
      aspect-ratio: 4 / 4.4;
      object-fit: cover;
      object-position: 50% 25%;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 28px;
      box-shadow: 0 40px 80px -40px rgba(var(--mc-violet-rgb), 0.7);
    }

    /* Name card overlapping the picture's bottom-left corner. */
    .portrait .card {
      position: absolute;
      bottom: 28px;
      left: -24px;
      display: grid;
      gap: 2px;
      padding: 14px 16px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 16px;
      background: rgba(26, 17, 32, 0.85);
      box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(12px);
    }

    .portrait .card b {
      font-size: 15px;
    }

    .portrait .card span {
      color: var(--mc-dark-muted);
      font-size: 12.5px;
    }

    @media (max-width: 900px) {
      .hero {
        grid-template-columns: minmax(0, 1fr);
        gap: 36px;
        padding-top: 40px;
      }

      .portrait {
        max-width: 440px;
      }

      .portrait .card {
        left: 12px;
      }
    }

    #benefits {
      padding-top: 40px;
    }

    .closing {
      padding-top: 24px;
    }

    /* Under the closing actions. */
    .price-line {
      flex-basis: 100%;
      margin: 6px 0 0;
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-mono);
      font-size: 13px;
    }

    /* Leaves room for the floating nav. */
    [id] {
      scroll-margin-top: 110px;
    }

    h2 {
      margin: 10px 0 0;
      font-size: clamp(30px, 4vw, 44px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
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

    /* Benefits: three tiles, headline then detail. */
    .benefits {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin: 36px 0 0;
      padding: 0;
      list-style: none;
    }

    @media (max-width: 900px) {
      .benefits {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .benefit {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 26px;
      border-radius: 22px;
    }

    .benefit .icon {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.28);
      border-radius: 12px;
      background: rgba(var(--mc-accent-rgb), 0.12);
      color: var(--mc-accent-bright);
    }

    .benefit .icon svg {
      width: 20px;
      height: 20px;
    }

    .benefit h3 {
      margin: 6px 0 0;
      font-size: 21px;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .benefit p {
      margin: 0;
      color: var(--mc-dark-muted);
      font-size: 15px;
    }
  `,
})
export class CoachingLandingPage {
  protected coaching = COACHING;
  protected labels = COACHING_LABELS;
  /* Same page info as `CoachingPage`. */
  protected pageInfo = createBasicPageInfo({
    title: this.coaching.title,
    pictureUri: this.coaching.heroPictureUri,
    description: this.coaching.description,
    path: coachingRouterHelper.coachingUrl(),
  });
  protected contactFormUrl = externalLinks.contactFormUrl;
  /* "Monthly Team" + gradient "Coaching". */
  protected title = splitLastWord(this.coaching.title);
  protected benefits = this.coaching.benefits;
  /* "Make this the quarter your team ships code it can" + gradient "trust". */
  protected ctaTitle = splitLastWord(this.coaching.ctaTitle);
}

function splitLastWord(text: string) {
  const lastSpaceIndex = text.lastIndexOf(' ');
  return {
    start: text.slice(0, Math.max(lastSpaceIndex, 0)),
    end: text.slice(lastSpaceIndex + 1),
  };
}
