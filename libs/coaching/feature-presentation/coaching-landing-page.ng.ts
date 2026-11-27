import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COACHING } from '@marmicode/coaching/core';
import { coachingRouterHelper } from '@marmicode/shared/router-helpers';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { COACHING_LABELS } from './coaching-presentation.i18n';

/**
 * Dark coaching page: hero with the coach picture, benefit tiles, the monthly rhythm and closing section.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-landing-page',
  imports: [PageComponent],
  template: `
    <mc-page [info]="pageInfo" theme="dark">
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
  protected benefits = this.coaching.benefits.map(splitBenefit);
}

/* "Deep-dive session — 4 hours, once a month. …" → bold headline + detail. */
function splitBenefit(benefit: string) {
  const separatorIndex = benefit.indexOf(' — ');
  if (separatorIndex === -1) {
    return { headline: benefit, detail: '' };
  }
  return {
    headline: benefit.slice(0, separatorIndex),
    detail: upperFirst(benefit.slice(separatorIndex + ' — '.length)),
  };
}

function upperFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
