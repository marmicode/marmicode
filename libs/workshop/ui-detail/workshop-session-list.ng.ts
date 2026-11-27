import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Link } from '@marmicode/shared/ui';
import {
  Session,
  UpcomingSession,
  Workshop,
  WorkshopLanguage,
} from '@marmicode/workshop/core';
import { formatSessionDates, formatSessionTimes } from '@marmicode/workshop/ui';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

/**
 * `sessions`: this workshop's upcoming sessions, each with **Book a seat** → `session.url` (new tab).
 * `otherSessions`: the other-language version's sessions, as dashed rows in that language (`lang`), linking to `otherWorkshopLink`.
 * Both empty: "No session scheduled yet." + custom session link (+ waitlist link when set).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-session-list',
  imports: [RouterLink],
  template: `
    <ul>
      @for (row of rows(); track row.key) {
        <li>
          <a class="session" [href]="row.href" rel="noopener" target="_blank">
            <span class="cal" aria-hidden="true">
              <b>{{ row.calendar.day }}</b>
              <span>{{ row.calendar.month }}</span>
            </span>
            <span class="info">
              <h3>{{ row.dates }}</h3>
              <small>{{ row.details }}</small>
            </span>
            <span class="book">
              {{ row.bookLabel }}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </a>
        </li>
      }
      @for (row of otherRows(); track row.key) {
        <li>
          <a
            class="session other"
            [attr.href]="row.href ?? null"
            [attr.lang]="row.language"
            [attr.rel]="row.href ? 'noopener' : null"
            [attr.target]="row.href ? '_blank' : null"
            [routerLink]="row.route ?? null"
          >
            <span class="cal" aria-hidden="true">
              <b>{{ row.calendar.day }}</b>
              <span>{{ row.calendar.month }}</span>
            </span>
            <span class="info">
              <h3>{{ row.dates }}</h3>
              <small>{{ row.details }}</small>
            </span>
            <span class="book ghost">
              {{ row.goLabel }}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      margin-top: 32px;
      color: var(--mc-dark-text);
    }

    ul {
      display: grid;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .session {
      display: grid;
      grid-template-columns: 96px 1fr auto;
      gap: 24px;
      align-items: center;
      padding: 20px 24px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 20px;
      background: var(--mc-dark-surface);
      color: inherit;
      text-decoration: none;
      transition:
        border-color 0.2s,
        transform 0.2s;
    }

    .session:hover {
      border-color: rgba(var(--mc-accent-rgb), 0.5);
      transform: translateY(-2px);
    }

    .session:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    .cal {
      padding: 10px 0;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.3);
      border-radius: 14px;
      background: rgba(var(--mc-accent-rgb), 0.1);
      text-align: center;
    }

    .cal b {
      display: block;
      font-size: 28px;
      letter-spacing: -0.02em;
      line-height: 1;
    }

    .cal span {
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 12px;
    }

    h3 {
      margin: 0 0 4px;
      font-size: 18px;
    }

    small {
      color: var(--mc-dark-muted);
      font-size: 14.5px;
    }

    .book {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 13px 22px;
      border: 1px solid transparent;
      border-radius: 12px;
      background: var(--mc-gradient);
      color: var(--mc-dark-bg);
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
    }

    .other {
      border-style: dashed;
      background: transparent;
    }

    .other .cal {
      border-color: var(--mc-dark-line-strong);
      background: transparent;
    }

    .other .cal span {
      color: var(--mc-dark-muted);
    }

    .book.ghost {
      border-color: var(--mc-dark-line-strong);
      background: rgba(255, 255, 255, 0.03);
      color: var(--mc-dark-text);
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

    @media (max-width: 640px) {
      .session {
        grid-template-columns: 72px 1fr;
        gap: 16px;
      }

      .book {
        grid-column: 1 / -1;
        justify-content: center;
      }
    }
  `,
})
export class WorkshopSessionList {
  workshop = input.required<Workshop>();
  sessions = input.required<UpcomingSession[]>();
  otherSessions = input<UpcomingSession[]>([]);
  /** Built by the page with `workshopRouterHelper`: `ui-detail` can't import `shared/router-helpers`. */
  otherWorkshopLink = input<Link>();

  protected rows = computed(() =>
    this.sessions().map(({ workshop, session }) => {
      const { language } = workshop;
      const labels = WORKSHOP_DETAIL_LABELS[language];
      return {
        key: session.startDate,
        bookLabel: labels.bookASession,
        calendar: formatCalendar({ session, language }),
        dates: formatSessionDates({ session, language }),
        details: [
          `${workshop.duration} ${
            workshop.duration === 1 ? labels.dayLowercase : labels.daysLowercase
          }`,
          formatSessionTimes(session),
          labels.online,
          labels.languageName,
        ].join(' · '),
        href: session.url,
      };
    }),
  );
  /* "5–7 janvier 2027 · 🇫🇷 Français", in the other workshop's language. */
  protected otherRows = computed(() => {
    const link = this.otherWorkshopLink();
    return this.otherSessions().map(({ workshop, session }) => {
      const { language } = workshop;
      const labels = WORKSHOP_DETAIL_LABELS[language];
      return {
        key: `${workshop.id}-${session.startDate}`,
        calendar: formatCalendar({ session, language }),
        dates: `${formatSessionDates({ session, language, month: 'long' })} · ${labels.languageName}`,
        details: `${labels.sameWorkshopInThisLanguage} · ${workshop.shortTitle}`,
        goLabel: labels.seeTheWorkshop,
        href: link && 'href' in link ? link.href : undefined,
        language,
        route: link && 'route' in link ? link.route : undefined,
      };
    });
  });
}

/**
 * Calendar tile: "12" + "JAN 2027" (fr: "JANV. 2027").
 */
function formatCalendar({
  session,
  language,
}: {
  session: Session;
  language: WorkshopLanguage;
}) {
  const date = new Date(`${session.startDate}T00:00:00Z`);
  return {
    day: new Intl.DateTimeFormat(LOCALES[language], {
      day: '2-digit',
      timeZone: 'UTC',
    }).format(date),
    month: new Intl.DateTimeFormat(LOCALES[language], {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
      .format(date)
      .toUpperCase(),
  };
}

const LOCALES: Record<WorkshopLanguage, string> = {
  en: 'en-US',
  fr: 'fr-FR',
};
