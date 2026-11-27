import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkdownBlockComponent } from '@marmicode/block/ui';
import {
  externalLinks,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import {
  Accordion,
  Badge,
  Button,
  ClosingSection,
  CookCard,
  createBasicPageInfo,
  Link,
  NewsletterBand,
  PageComponent,
} from '@marmicode/shared/ui';
import { TODAY } from '@marmicode/shared/utils';
import {
  formatPrice,
  RequiredKnowledgeCard,
  TrainingBenefitGrid,
  TrainingPageHero,
  TrainingQuoteGrid,
} from '@marmicode/training/ui';
import { getUpcomingSessions, Workshop } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import {
  formatSessionDates,
  workshopViewTransitionName,
} from '@marmicode/workshop/ui';
import {
  WORKSHOP_DETAIL_LABELS,
  WorkshopBookBar,
  WorkshopProgram,
  WorkshopSectionTabs,
  WorkshopSessionList,
} from '@marmicode/workshop/ui-detail';

/**
 * Dark workshop page: hero, section tabs, overview, sessions, benefits, testimonials,
 * program, the cook, FAQ, closing section and the sticky booking bar.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-page',
  imports: [
    Accordion,
    Badge,
    Button,
    ClosingSection,
    CookCard,
    LowerCasePipe,
    MarkdownBlockComponent,
    NewsletterBand,
    PageComponent,
    RequiredKnowledgeCard,
    RouterLink,
    TrainingBenefitGrid,
    TrainingPageHero,
    TrainingQuoteGrid,
    WorkshopBookBar,
    WorkshopProgram,
    WorkshopSectionTabs,
    WorkshopSessionList,
  ],
  template: `
    <mc-page [info]="info()">
      @if (workshop(); as workshop) {
        @let labels = this.labels();
        @let price = this.price();

        <mc-training-page-hero
          class="wrap"
          [breadcrumb]="breadcrumb()"
          [training]="workshop"
          [viewTransitionName]="viewTransitionName()"
        >
          @if (workshop.waitlist; as waitlist) {
            <a
              mcButton
              slot="actions"
              [href]="waitlist.url"
              rel="noopener"
              target="_blank"
            >
              {{ labels.joinWaitlist }}
            </a>
          } @else {
            <a mcButton slot="actions" [routerLink]="[]" fragment="sessions">
              {{ labels.bookASession }}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          }
          <a
            mcButton="ghost"
            slot="actions"
            [href]="workshop.customSessionRequestUrl"
            rel="noopener"
            target="_blank"
          >
            {{ labels.requestACustomSession }}
          </a>

          @for (alternate of alternates(); track alternate.route) {
            <a
              class="alternate"
              slot="note"
              [attr.lang]="alternate.language"
              [routerLink]="alternate.route"
            >
              <span aria-hidden="true">{{ alternate.flag }}</span>
              {{ alternate.text }}
              <span aria-hidden="true">→</span>
            </a>
          }
          @if (labels.opcoNote) {
            <p slot="note" class="opco">{{ labels.opcoNote }}</p>
          }

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

        <mc-workshop-section-tabs class="wrap" [language]="workshop.language" />

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

        <section id="learn" class="wrap">
          <span class="mc-eyebrow"
            >// {{ labels.whatYouWillLearn | lowercase }}</span
          >
          <h2>{{ labels.whatYouWillLearn }}</h2>
          <mc-training-benefit-grid
            class="section-content"
            [benefits]="workshop.benefits"
          />
        </section>

        @if (workshop.testimonials?.length) {
          <section id="testimonials" class="wrap">
            <span class="mc-eyebrow"
              >// {{ labels.testimonials | lowercase }}</span
            >
            <h2>{{ labels.testimonials }}</h2>
            <mc-training-quote-grid
              class="section-content"
              [testimonials]="workshop.testimonials ?? []"
            />
          </section>
        }

        <section id="program" class="wrap">
          <span class="mc-eyebrow">// {{ labels.program | lowercase }}</span>
          <h2>{{ labels.program }}</h2>
          <mc-workshop-program
            [agenda]="workshop.agenda"
            [language]="workshop.language"
          />
        </section>

        <section class="wrap">
          <mc-cook-card />
        </section>

        <section id="faq" class="wrap">
          <span class="mc-eyebrow">// {{ labels.faqTab | lowercase }}</span>
          <h2>{{ labels.faq }}</h2>
          <mc-accordion class="section-content" [items]="faqItems()" />
        </section>

        <section class="wrap">
          <mc-newsletter-band
            [description]="labels.newsletterDescription"
            [heading]="labels.newsletterHeading"
            [language]="workshop.language"
            source="workshop"
          />
        </section>

        <section class="wrap closing">
          <mc-closing-section
            [description]="closing().description"
            [eyebrow]="closing().eyebrow"
          >
            {{ closing().titleStart }}
            <span class="mc-gradient-text">{{ closing().titleEnd }}</span>
            @if (workshop.waitlist; as waitlist) {
              <a
                mcButton
                slot="actions"
                [href]="waitlist.url"
                rel="noopener"
                target="_blank"
              >
                {{ labels.joinWaitlist }}
              </a>
            } @else {
              <a mcButton slot="actions" [routerLink]="[]" fragment="sessions">
                {{ labels.bookASession }}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            }
            <a
              mcButton="ghost"
              slot="actions"
              [href]="workshop.customSessionRequestUrl"
              rel="noopener"
              target="_blank"
            >
              {{ labels.requestACustomSession }}
            </a>
          </mc-closing-section>
        </section>

        <mc-workshop-book-bar
          [visible]="bookBarVisible()"
          [workshop]="workshop"
        />
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
      padding: 24px 0 72px;
    }

    #overview {
      padding-top: 72px;
    }

    /* Leaves room for the floating nav and the sticky section tabs. */
    [id] {
      scroll-margin-top: 150px;
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

    .alternate {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 2px;
      border-bottom: 1px solid var(--mc-dark-line-strong);
      color: var(--mc-dark-muted);
      text-decoration: none;
    }

    .alternate:hover {
      border-color: var(--mc-accent);
      color: var(--mc-dark-text);
    }

    .opco {
      margin: 0;
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

    .glance s {
      margin-left: 6px;
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
      top: 150px;
      display: grid;
      gap: 14px;
    }

    @media (max-width: 960px) {
      .aside {
        position: static;
      }
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
      box-sizing: border-box;
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
  protected viewTransitionName = computed(() => {
    const workshop = this.workshop();
    return workshop ? workshopViewTransitionName(workshop) : undefined;
  });
  protected labels = computed(
    () => WORKSHOP_DETAIL_LABELS[this.workshop()?.language ?? 'en'],
  );
  /* "🇫🇷 Également disponible en français →", in the alternate's language. */
  protected alternates = computed(() =>
    (this.workshop()?.alternates ?? []).map(({ id, language }) => {
      const labels = WORKSHOP_DETAIL_LABELS[language];
      return {
        flag: labels.flag,
        language,
        route: workshopRouterHelper.detail(id),
        text: labels.alsoAvailableInThisLanguage,
      };
    }),
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

  protected faqItems = computed(() =>
    this._requireWorkshop().faqs.map(({ question, answer }) => ({
      title: question,
      content: answer,
    })),
  );
  /* Closing section: "Dinner's" + gradient "ready!". */
  protected closing = computed(() => {
    const { callToAction, subheading } = this._requireWorkshop();
    const labels = this.labels();
    const title = callToAction?.title ?? labels.callToActionTitle;
    const lastSpaceIndex = title.lastIndexOf(' ');
    return {
      description:
        callToAction?.description ?? subheading.replaceAll('\n', ' '),
      eyebrow: `// ${labels.closingEyebrow}`,
      titleStart: title.slice(0, Math.max(lastSpaceIndex, 0)),
      titleEnd: title.slice(lastSpaceIndex + 1),
    };
  });
  /* Visible once the hero is scrolled away, until the closing section shows up. */
  protected bookBarVisible = computed(
    () => !this._heroVisible() && !this._closingVisible(),
  );

  private _heroVisible = signal(true);
  private _closingVisible = signal(false);
  private _hero = viewChild(TrainingPageHero, { read: ElementRef });
  private _closingSection = viewChild(ClosingSection, { read: ElementRef });
  private _today = inject(TODAY);
  private _workshopRepository = inject(WorkshopRepository);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      const observe = (
        element: ElementRef<HTMLElement> | undefined,
        isVisible: (visible: boolean) => void,
      ) => {
        if (!element) {
          return;
        }
        const observer = new IntersectionObserver(([entry]) =>
          isVisible(entry.isIntersecting),
        );
        observer.observe(element.nativeElement);
        destroyRef.onDestroy(() => observer.disconnect());
      };
      observe(this._hero(), (visible) => this._heroVisible.set(visible));
      observe(this._closingSection(), (visible) =>
        this._closingVisible.set(visible),
      );
    });
  }

  /* Only called from the template's `@if (workshop())` branch. */
  private _requireWorkshop(): Workshop {
    const workshop = this.workshop();
    if (!workshop) {
      throw new Error(`Workshop ${this.workshopId()} not found.`);
    }
    return workshop;
  }
}
