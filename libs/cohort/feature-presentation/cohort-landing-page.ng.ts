import { LowerCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownBlockComponent } from '@marmicode/block/ui';
import {
  Cohort,
  FROM_DRIFT_TO_TRUST_FOR_ANGULAR,
} from '@marmicode/cohort/core';
import {
  cohortRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import {
  Accordion,
  Badge,
  Button,
  ClosingSection,
  CookCard,
  createBasicPageInfo,
  PageComponent,
} from '@marmicode/shared/ui';
import { Offer } from '@marmicode/training/core';
import {
  formatPrice,
  RequiredKnowledgeCard,
  TRAINING_LABELS,
  TrainingBenefitGrid,
  TrainingPageHero,
  TrainingQuoteGrid,
} from '@marmicode/training/ui';
import { COHORT_LABELS } from './cohort-presentation.i18n';
import { CohortRoute } from './cohort-route.ng';
import { CohortRouteDiagram } from './cohort-route-diagram.ng';

/**
 * Dark cohort page: hero with the offer card, description and format, the weekly route,
 * the workflow diagram, benefits, required knowledge with the cook, testimonials, FAQ and closing section.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-landing-page',
  imports: [
    Accordion,
    Badge,
    Button,
    ClosingSection,
    CohortRoute,
    CohortRouteDiagram,
    CookCard,
    LowerCasePipe,
    MarkdownBlockComponent,
    PageComponent,
    RequiredKnowledgeCard,
    RouterLink,
    TrainingBenefitGrid,
    TrainingPageHero,
    TrainingQuoteGrid,
  ],
  template: `
    <mc-page [info]="pageInfo" theme="dark">
      <mc-training-page-hero
        asideLayout="attached"
        class="wrap"
        [breadcrumb]="breadcrumb"
        [training]="cohort"
      >
        <a mcButton="ghost" slot="actions" [routerLink]="[]" fragment="program">
          {{ labels.seeTheProgram }}
        </a>

        @if (cohort.waitlist) {
          <p slot="note">{{ labels.waitlistNote }}</p>
        }
        <p slot="note">{{ labels.frenchNote }}</p>

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

      <section id="overview" class="wrap overview">
        <div class="prose">
          <span class="mc-eyebrow">// {{ labels.whyEyebrow }}</span>
          <h2>
            {{ shortTitle.start }}
            <span class="mc-gradient-text">{{ shortTitle.end }}</span>
          </h2>
          <mc-markdown-block [block]="cohort.description" />
        </div>

        <div class="format">
          <span class="mc-eyebrow">// {{ labels.formatEyebrow }}</span>
          @for (track of format; track track.label) {
            <div class="track mc-surface">
              <span class="emoji" aria-hidden="true">{{ track.emoji }}</span>
              <div>
                <span class="when">{{ track.when }}</span>
                <h3>{{ track.label }}</h3>
                @if (track.description) {
                  <p>{{ track.description }}</p>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <section id="program" class="wrap">
        <span class="mc-eyebrow">// {{ labels.programEyebrow }}</span>
        <h2>{{ labels.programTitle }}</h2>
        <mc-cohort-route
          class="section-content"
          [weeks]="cohort.schedule.weeks"
        />
      </section>

      <section id="workflow" class="wrap">
        <span class="mc-eyebrow">// {{ labels.workflowEyebrow }}</span>
        <h2>{{ labels.workflowTitle }}</h2>
        <div class="workflow mc-surface section-content">
          <mc-cohort-route-diagram />
        </div>
      </section>

      <section id="learn" class="wrap">
        <span class="mc-eyebrow"
          >// {{ trainingLabels.whatYouWillLearn | lowercase }}</span
        >
        <h2>{{ trainingLabels.whatYouWillLearn }}</h2>
        <mc-training-benefit-grid
          class="section-content"
          [benefits]="cohort.benefits"
        />
      </section>

      <section class="wrap knowledge">
        <mc-required-knowledge-card
          [language]="cohort.language"
          [skills]="cohort.requiredSkills"
        />
        <mc-cook-card appearance="banner" />
      </section>

      @if (cohort.testimonials?.length) {
        <section id="testimonials" class="wrap">
          <span class="mc-eyebrow"
            >// {{ trainingLabels.testimonials | lowercase }}</span
          >
          <h2>{{ trainingLabels.testimonials }}</h2>
          <mc-training-quote-grid
            class="section-content"
            [testimonials]="cohort.testimonials ?? []"
          />
        </section>
      }

      <section id="faq" class="wrap">
        <span class="mc-eyebrow">// {{ labels.faqEyebrow }}</span>
        <h2>{{ trainingLabels.faq }}</h2>
        <mc-accordion class="section-content" [items]="faqItems" />
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

    #overview {
      padding-top: 72px;
    }

    h3 {
      margin: 0;
    }

    /* Description next to the format. */
    .overview {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 48px;
      align-items: start;
    }

    @media (max-width: 860px) {
      .overview {
        grid-template-columns: minmax(0, 1fr);
        gap: 24px;
      }
    }

    .prose mc-markdown-block {
      margin: 12px 0 0;
      color: #d9cfdc;
      font-family: var(--mc-font-sans);
      font-size: 17px;
      line-height: 1.6;
      --mc-markdown-link-color: var(--mc-accent);
    }

    .format {
      display: grid;
      gap: 12px;
    }

    .track {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 14px;
      align-items: start;
      padding: 18px 20px;
    }

    .track .emoji {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.25);
      border-radius: 12px;
      background: rgba(var(--mc-accent-rgb), 0.1);
      font-size: 22px;
    }

    .track .when {
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 12px;
    }

    .track h3 {
      margin: 0 0 4px;
      font-size: 17px;
      font-weight: 600;
    }

    .track p {
      margin: 0;
      color: var(--mc-dark-muted);
      font-size: 14.5px;
    }

    /* The route diagram, on a dark surface instead of the old plum section. */
    .workflow {
      padding: clamp(16px, 3vw, 32px) 0;
    }

    .workflow mc-cohort-route-diagram {
      --diagram-background: var(--mc-dark-surface);
    }

    /* Required knowledge next to the cook. */
    .knowledge {
      display: grid;
      grid-template-columns: 340px minmax(0, 1fr);
      gap: 18px;
      align-items: start;
    }

    @media (max-width: 920px) {
      .knowledge {
        grid-template-columns: minmax(0, 1fr);
      }
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
  protected trainingLabels = TRAINING_LABELS[this.cohort.language];
  /* "From Drift to" + gradient "Trust". */
  protected shortTitle = splitLastWord(this.cohort.shortTitle);
  /* The video course first, then a live session every week, with the community in between. */
  protected format = [
    this.cohort.schedule.videoCourse,
    {
      emoji: this.labels.liveSessionEmoji,
      when: `${this.cohort.schedule.liveSession.when} · ${this.cohort.schedule.liveSession.duration}`,
      label: this.cohort.schedule.liveSession.label,
      description: undefined,
    },
    this.cohort.schedule.community,
  ];
  protected faqItems = this.cohort.faqs.map(({ question, answer }) => ({
    title: question,
    content: answer,
  }));
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
  const { start, end } = splitLastWord(
    callToAction?.title ?? TRAINING_LABELS.en.callToActionTitle,
  );
  return {
    description: callToAction?.description ?? subheading.replaceAll('\n', ' '),
    eyebrow: `// ${nextCohort.toLowerCase()}`,
    titleStart: start,
    titleEnd: end,
  };
}

function splitLastWord(text: string) {
  const lastSpaceIndex = text.lastIndexOf(' ');
  return {
    start: text.slice(0, Math.max(lastSpaceIndex, 0)),
    end: text.slice(lastSpaceIndex + 1),
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
