import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkdownBlockComponent } from '@marmicode/block/ui';
import {
  externalLinks,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import {
  Badge,
  Button,
  createBasicPageInfo,
  Link,
  PageComponent,
} from '@marmicode/shared/ui';
import { TODAY } from '@marmicode/shared/utils';
import {
  formatPrice,
  RequiredKnowledgeCard,
  TrainingPageHero,
} from '@marmicode/training/ui';
import { getUpcomingSessions, Workshop } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { formatSessionDates } from '@marmicode/workshop/ui';
import {
  WORKSHOP_DETAIL_LABELS,
  WorkshopProgram,
  WorkshopSessionList,
} from '@marmicode/workshop/ui-detail';

/**
 * Dark workshop page: hero, section tabs, overview, sessions, benefits, testimonials,
 * program, the cook, FAQ, closing section and the sticky booking bar.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-page',
  imports: [
    Badge,
    Button,
    LowerCasePipe,
    MarkdownBlockComponent,
    PageComponent,
    RequiredKnowledgeCard,
    RouterLink,
    TrainingPageHero,
    WorkshopProgram,
    WorkshopSessionList,
  ],
  template: `
    <mc-page [info]="info()" theme="dark">
      @if (workshop(); as workshop) {
        @let labels = this.labels();
        @let price = this.price();

        <mc-training-page-hero
          class="wrap"
          [breadcrumb]="breadcrumb()"
          [training]="workshop"
        >
          <div slot="aside" class="price-card">
            @if (offerLabel(); as offerLabel) {
              <mc-badge variant="highlight">{{ offerLabel }}</mc-badge>
            }
            <div class="price">
              <b>{{ price.current }}</b>
              @if (price.original; as original) {
                <s>{{ original }}</s>
              }
            </div>
            <small>{{ priceDetails() }}</small>
          </div>
        </mc-training-page-hero>

        <section id="overview" class="wrap overview">
          <div class="prose">
            <span class="mc-eyebrow">// {{ labels.overview }}</span>
            <mc-markdown-block [block]="workshop.description" />
          </div>

          <aside class="aside">
            <div class="glance mc-surface">
              <h3>// {{ labels.atAGlance }}</h3>
              <dl>
                @if (nextSessionDates(); as nextSessionDates) {
                  <div>
                    <dt>{{ labels.glance.nextSession }}</dt>
                    <dd>
                      <a [routerLink]="[]" fragment="sessions">{{
                        nextSessionDates
                      }}</a>
                    </dd>
                  </div>
                }
                <div>
                  <dt>{{ labels.glance.format }}</dt>
                  <dd>{{ labels.glance.formatValue }}</dd>
                </div>
                <div>
                  <dt>{{ labels.glance.duration }}</dt>
                  <dd>{{ duration() }}</dd>
                </div>
                <div>
                  <dt>{{ labels.glance.location }}</dt>
                  <dd>{{ labels.online }}</dd>
                </div>
                <div>
                  <dt>{{ labels.glance.language }}</dt>
                  <dd>{{ labels.languageName }}</dd>
                </div>
                <div>
                  <dt>{{ labels.glance.group }}</dt>
                  <dd>{{ labels.glance.groupValue }}</dd>
                </div>
                <div>
                  <dt>{{ labels.glance.price }}</dt>
                  <dd>
                    <b>{{ price.current }}</b>
                    @if (price.original; as original) {
                      <s>{{ original }}</s>
                    }
                  </dd>
                </div>
              </dl>
              @if (workshop.waitlist; as waitlist) {
                <a
                  mcButton
                  [href]="waitlist.url"
                  rel="noopener"
                  target="_blank"
                >
                  {{ labels.joinWaitlist }}
                </a>
              } @else {
                <a mcButton [routerLink]="[]" fragment="sessions">
                  {{ labels.bookASession }}
                </a>
              }
              <a
                class="small"
                [href]="workshop.customSessionRequestUrl"
                rel="noopener"
                target="_blank"
                >{{ labels.orRequestACustomSession }}</a
              >
            </div>

            <mc-required-knowledge-card
              [language]="workshop.language"
              [skills]="workshop.requiredSkills"
            />
          </aside>
        </section>

        <section id="sessions" class="wrap">
          <span class="mc-eyebrow">// {{ labels.onTheStove }}</span>
          <h2>{{ labels.upcomingSessions }}</h2>
          <mc-workshop-session-list
            [otherSessions]="otherSessions()"
            [otherWorkshopLink]="otherWorkshopLink()"
            [sessions]="sessions()"
            [workshop]="workshop"
          />
        </section>

        <section id="program" class="wrap">
          <span class="mc-eyebrow">// {{ labels.program | lowercase }}</span>
          <h2>{{ labels.program }}</h2>
          <mc-workshop-program
            [agenda]="workshop.agenda"
            [language]="workshop.language"
          />
        </section>
      } @else {
        <section class="wrap">
          <h2>Workshop not found.</h2>
          <p>
            Please check the URL or
            <a [href]="contactFormUrl" rel="noopener" target="_blank"
              >contact us</a
            >.
          </p>
        </section>
      }
    </mc-page>
  `,
  styles: `
    .wrap {
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    section {
      position: relative;
      padding: 72px 0;
    }

    [id] {
      scroll-margin-top: 96px;
    }

    h2 {
      margin: 10px 0 0;
      font-size: clamp(30px, 4vw, 44px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }

    /* Hero price card, overlapping the picture. */
    .price-card {
      padding: 16px 20px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.45);
      border-radius: 18px;
      background: rgba(26, 17, 32, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 20px 40px -16px rgba(0, 0, 0, 0.7);
    }

    .price {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-top: 6px;
    }

    .price b {
      font-size: 28px;
      letter-spacing: -0.03em;
    }

    .price-card s,
    .price-card small,
    .glance s {
      color: var(--mc-dark-muted);
    }

    .price-card small {
      display: block;
      margin-top: 2px;
      font-size: 12.5px;
    }

    @media (max-width: 900px) {
      .price-card {
        padding: 12px 16px;
      }

      .price b {
        font-size: 22px;
      }
    }

    /* Overview: description + at a glance + required knowledge. */
    .overview {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 340px;
      gap: 48px;
      align-items: start;
    }

    @media (max-width: 960px) {
      .overview {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .prose {
      max-width: 68ch;
    }

    .prose mc-markdown-block {
      margin: 12px 0 0;
      color: #d9cfdc;
      font-family: var(--mc-font-sans);
      font-size: 17px;
      line-height: 1.6;
      --mc-markdown-link-color: var(--mc-accent);
    }

    .aside {
      position: sticky;
      top: 96px;
      display: grid;
      gap: 14px;
    }

    .glance {
      padding: 22px;
    }

    .glance h3 {
      margin: 0 0 14px;
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    dl {
      display: grid;
      margin: 0;
    }

    dl div {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 0;
      border-top: 1px solid var(--mc-dark-line);
      font-size: 14.5px;
    }

    dl div:first-child {
      padding-top: 0;
      border-top: 0;
    }

    dt {
      color: var(--mc-dark-muted);
    }

    dd {
      margin: 0;
      text-align: right;
    }

    dd a {
      color: inherit;
    }

    .glance [mcButton] {
      justify-content: center;
      width: 100%;
      margin-top: 16px;
    }

    .glance .small {
      display: block;
      margin-top: 10px;
      color: var(--mc-dark-muted);
      font-size: 13.5px;
      text-align: center;
      text-decoration: none;
    }

    .glance .small:hover {
      color: var(--mc-dark-text);
    }
  `,
})
export class WorkshopPage {
  workshopId = input.required<string>();

  protected contactFormUrl = externalLinks.contactFormUrl;
  protected info = computed(() => {
    const w = this.workshop();

    const allAlternates = w?.alternates
      ? [{ id: w.id, language: w.language }, ...w.alternates]
      : [];

    return createBasicPageInfo({
      title: w?.title,
      pictureUri: w?.pictureUri,
      language: w?.language,
      path: w ? workshopRouterHelper.detailUrl(w.id) : undefined,
      alternates: allAlternates.map((alternate) => ({
        path: workshopRouterHelper.detailUrl(alternate.id),
        language: alternate.language,
      })),
      description: w?.description,
    });
  });
  protected workshop = computed(() =>
    this._workshopRepository.findWorkshop(this.workshopId()),
  );
  protected labels = computed(
    () => WORKSHOP_DETAIL_LABELS[this.workshop()?.language ?? 'en'],
  );
  protected breadcrumb = computed(() => [
    {
      label: this.labels().breadcrumbTraining,
      link: { route: workshopRouterHelper.list() },
    },
    { label: this.labels().breadcrumbWorkshops },
  ]);
  protected duration = computed(() => {
    const { duration } = this._requireWorkshop();
    const labels = this.labels();
    return `${duration} ${duration === 1 ? labels.dayLowercase : labels.daysLowercase}`;
  });
  protected offerLabel = computed(() => {
    const { offer } = this._requireWorkshop();
    const labels = this.labels();
    switch (offer.type) {
      case 'early-bird':
        return labels.earlyBird;
      case 'last-minute':
        return labels.lastMinute;
    }
  });
  protected price = computed(() => {
    const { offer, language } = this._requireWorkshop();
    return {
      current: formatPrice({ price: offer.price, locale: language }),
      original:
        offer.type === 'early-bird'
          ? formatPrice({ price: offer.originalPrice, locale: language })
          : undefined,
    };
  });
  /* "per seat · 3 days · small group" */
  protected priceDetails = computed(() =>
    [this.labels().perSeat, this.duration(), this.labels().smallGroup].join(
      ' · ',
    ),
  );
  protected sessions = computed(() => {
    const workshop = this.workshop();
    return workshop
      ? getUpcomingSessions({ workshops: [workshop], today: this._today() })
      : [];
  });
  protected nextSessionDates = computed(() => {
    const [next] = this.sessions();
    return next
      ? formatSessionDates({
          session: next.session,
          language: next.workshop.language,
        })
      : undefined;
  });
  /* The other-language version of this workshop. */
  private _otherWorkshop = computed(() => {
    const alternate = this.workshop()?.alternates?.[0];
    return alternate
      ? this._workshopRepository.findWorkshop(alternate.id)
      : undefined;
  });
  protected otherSessions = computed(() => {
    const otherWorkshop = this._otherWorkshop();
    return otherWorkshop
      ? getUpcomingSessions({
          workshops: [otherWorkshop],
          today: this._today(),
        })
      : [];
  });
  protected otherWorkshopLink = computed<Link | undefined>(() => {
    const otherWorkshop = this._otherWorkshop();
    return otherWorkshop
      ? { route: workshopRouterHelper.detail(otherWorkshop.id) }
      : undefined;
  });

  private _today = inject(TODAY);
  private _workshopRepository = inject(WorkshopRepository);

  /* Only called from the template's `@if (workshop())` branch. */
  private _requireWorkshop(): Workshop {
    const workshop = this.workshop();
    if (!workshop) {
      throw new Error(`Workshop ${this.workshopId()} not found.`);
    }
    return workshop;
  }
}
