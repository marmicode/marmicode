import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Cohort,
  FROM_DRIFT_TO_TRUST_FOR_ANGULAR,
} from '@marmicode/cohort/core';
import {
  cohortRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import {
  Badge,
  Button,
  ClosingSection,
  createBasicPageInfo,
  PageComponent,
} from '@marmicode/shared/ui';
import { Offer } from '@marmicode/training/core';
import {
  formatPrice,
  TRAINING_LABELS,
  TrainingPageHero,
} from '@marmicode/training/ui';
import { COHORT_LABELS } from './cohort-presentation.i18n';
import { CohortRoute } from './cohort-route.ng';

/**
 * Dark cohort page: hero with the offer card, description and format, the weekly route,
 * the workflow diagram, benefits, required knowledge with the cook, testimonials, FAQ and closing section.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-landing-page',
  imports: [
    Badge,
    Button,
    ClosingSection,
    CohortRoute,
    PageComponent,
    TrainingPageHero,
  ],
  template: `
    <mc-page [info]="pageInfo" theme="dark">
      <mc-training-page-hero
        asideLayout="attached"
        class="wrap"
        [breadcrumb]="breadcrumb"
        [training]="cohort"
      >
        <div slot="aside" class="offer">
          <div class="price-row">
            @if (offerLabel; as offerLabel) {
              <mc-badge variant="highlight">{{ offerLabel }}</mc-badge>
            }
            <b>{{ price.current }}</b>
            @if (price.original; as original) {
              <s>{{ original }}</s>
            }
          </div>
          <p class="next">
            <span>{{ labels.nextCohort }}</span>
            <b>{{ cohort.nextCohort }}</b>
          </p>
          @if (cohort.waitlist; as waitlist) {
            <a mcButton [href]="waitlist.url" rel="noopener" target="_blank">
              {{ labels.joinTheWaitlist }}
            </a>
          }
        </div>
      </mc-training-page-hero>

      <section id="program" class="wrap">
        <span class="mc-eyebrow">// {{ labels.programEyebrow }}</span>
        <h2>{{ labels.programTitle }}</h2>
        <mc-cohort-route
          class="section-content"
          [weeks]="cohort.schedule.weeks"
        />
      </section>

      <section class="wrap">
        <mc-closing-section
          [description]="closing.description"
          [eyebrow]="closing.eyebrow"
        >
          {{ closing.titleStart }}
          <span class="mc-gradient-text">{{ closing.titleEnd }}</span>
          @if (cohort.waitlist; as waitlist) {
            <a
              mcButton
              slot="actions"
              [href]="waitlist.url"
              rel="noopener"
              target="_blank"
            >
              {{ labels.joinTheWaitlist }}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          }
          <p slot="actions" class="price-line">
            @if (offerLabel) {
              {{ offerLabel }}
            }
            {{ price.current }}
            @if (price.original; as original) {
              <s>{{ original }}</s>
            }
          </p>
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

    /* Leaves room for the floating nav. */
    [id] {
      scroll-margin-top: 110px;
    }

    .section-content {
      margin-top: 36px;
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

    /* Hero offer card, under the picture. */
    .offer {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 22px 24px 24px;
    }

    .price-row {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 8px 12px;
    }

    .price-row b {
      font-size: 34px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .price-row s {
      color: var(--mc-dark-muted);
      font-size: 17px;
    }

    .next {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 4px 10px;
      margin: 0;
      font-size: 15px;
    }

    .offer [mcButton] {
      justify-content: center;
    }

    /* Under the closing actions. */
    .price-line {
      flex-basis: 100%;
      margin: 6px 0 0;
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-mono);
      font-size: 14px;
    }

    .next span {
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 12.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  `,
})
export class CohortLandingPage {
  protected cohort = FROM_DRIFT_TO_TRUST_FOR_ANGULAR;
  protected labels = COHORT_LABELS;
  /* Same page info as `CohortPage`. */
  protected pageInfo = createBasicPageInfo({
    title: this.cohort.title,
    /* The description is a long markdown text, while the subheading sums the cohort up. */
    description: this.cohort.subheading.replaceAll('\n', ' '),
    pictureUri: this.cohort.pictureUri,
    path: cohortRouterHelper.detailUrl(this.cohort.id),
  });
  protected breadcrumb = [
    {
      label: this.labels.breadcrumbTraining,
      link: { route: workshopRouterHelper.list() },
    },
    { label: this.labels.breadcrumbCohort },
  ];
  protected offerLabel = getOfferLabel(this.cohort.offer);
  protected price = {
    current: formatPrice({
      price: this.cohort.offer.price,
      locale: this.cohort.language,
    }),
    original:
      this.cohort.offer.type === 'early-bird'
        ? formatPrice({
            price: this.cohort.offer.originalPrice,
            locale: this.cohort.language,
          })
        : undefined,
  };
  /* "Get on the" + gradient "list.". */
  protected closing = getClosing(this.cohort);
}

function getClosing({ callToAction, nextCohort, subheading }: Cohort) {
  const title = callToAction?.title ?? TRAINING_LABELS.en.callToActionTitle;
  const lastSpaceIndex = title.lastIndexOf(' ');
  return {
    description: callToAction?.description ?? subheading.replaceAll('\n', ' '),
    eyebrow: `// ${nextCohort.toLowerCase()}`,
    titleStart: title.slice(0, Math.max(lastSpaceIndex, 0)),
    titleEnd: title.slice(lastSpaceIndex + 1),
  };
}

function getOfferLabel(offer: Offer) {
  switch (offer.type) {
    case 'early-bird':
      return COHORT_LABELS.earlyBird;
    case 'last-minute':
      return TRAINING_LABELS.en.lastMinute;
  }
}
