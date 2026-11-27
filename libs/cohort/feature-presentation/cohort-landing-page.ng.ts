import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { Badge, PageComponent } from '@marmicode/shared/ui';
import { Offer } from '@marmicode/training/core';
import {
  formatPrice,
  TRAINING_LABELS,
  TrainingPageHero,
} from '@marmicode/training/ui';
import { COHORT_LABELS } from './cohort-presentation.i18n';

/**
 * Dark cohort page: hero with the offer card, description and format, the weekly route,
 * the workflow diagram, benefits, required knowledge with the cook, testimonials, FAQ and closing section.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-landing-page',
  imports: [Badge, PageComponent, TrainingPageHero],
  template: `
    <mc-page theme="dark">
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
        </div>
      </mc-training-page-hero>
    </mc-page>
  `,
  styles: `
    .wrap {
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
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
}

function getOfferLabel(offer: Offer) {
  switch (offer.type) {
    case 'early-bird':
      return COHORT_LABELS.earlyBird;
    case 'last-minute':
      return TRAINING_LABELS.en.lastMinute;
  }
}
