import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import {
  Session,
  UpcomingSession,
  WorkshopLanguage,
} from '@marmicode/workshop/core';
import { formatSessionDates, formatSessionTimes } from '@marmicode/workshop/ui';

/**
 * One row per session: "DEC 08" date tile, workshop title (with `lang`), "Workshop · Online · 🇬🇧 English · Dec 8–9 · 9:30–18:00 CET".
 * Each row links to the workshop page. Empty list: "No public session scheduled right now." + link to /trainings.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-upcoming-session-list',
  imports: [RouterLink],
  template: `
    @if (rows().length === 0) {
      <p class="empty">
        No public session scheduled right now.
        <a [routerLink]="workshopRouterHelper.list()">See all trainings →</a>
      </p>
    } @else {
      <ul>
        @for (row of rows(); track row.key) {
          <li>
            <a class="row" [routerLink]="row.route" [attr.lang]="row.language">
              <time [attr.datetime]="row.startDate">{{ row.dateTile }}</time>
              <div>
                <h3>{{ row.title }}</h3>
                <small>{{ row.details }}</small>
              </div>
              <span class="go">{{ row.goLabel }} →</span>
            </a>
          </li>
        }
      </ul>
    }
  `,
  styles: `
    :host {
      display: block;
      margin-top: 32px;
    }

    .empty {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 12px;
      margin: 0;
      padding: 24px;
      border: 1px dashed var(--mc-dark-line-strong);
      border-radius: 20px;
      color: var(--mc-dark-muted);
    }

    .empty a {
      color: var(--mc-dark-text);
      font-weight: 600;
      text-decoration: none;
    }

    .empty a:hover {
      color: var(--mc-accent-bright);
    }

    ul {
      margin: 0;
      padding: 0;
      overflow: hidden;
      border: 1px solid var(--mc-dark-line);
      border-radius: 20px;
      list-style: none;
    }

    li + li {
      border-top: 1px solid var(--mc-dark-line);
    }

    .row {
      display: grid;
      grid-template-columns: 110px 1fr auto;
      gap: 20px;
      align-items: center;
      padding: 18px 24px;
      color: var(--mc-dark-text);
      text-decoration: none;
      transition: background 0.2s;
    }

    .row:hover {
      background: var(--mc-dark-surface);
    }

    .row:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: -2px;
    }

    time {
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 13px;
    }

    h3 {
      margin: 0;
      font-size: 17px;
      font-weight: 600;
    }

    small {
      color: var(--mc-dark-muted);
    }

    .go {
      color: var(--mc-dark-muted);
      font-size: 14px;
    }

    .row:hover .go {
      color: var(--mc-dark-text);
    }

    @media (max-width: 600px) {
      .row {
        grid-template-columns: 1fr;
        gap: 4px;
      }
    }
  `,
})
export class UpcomingSessionList {
  sessions = input.required<UpcomingSession[]>();

  protected readonly workshopRouterHelper = workshopRouterHelper;

  protected readonly rows = computed(() =>
    this.sessions().map(({ workshop, session }) => {
      const labels = LABELS[workshop.language];
      return {
        key: `${workshop.id}-${session.startDate}`,
        dateTile: formatDateTile(session),
        details: [
          labels.workshop,
          labels.location[workshop.location],
          labels.language,
          formatSessionDates({
            session,
            language: workshop.language,
            short: true,
          }),
          formatSessionTimes(session),
        ].join(' · '),
        goLabel: labels.details,
        language: workshop.language,
        route: workshopRouterHelper.detail(workshop.id),
        startDate: session.startDate,
        title: workshop.shortTitle,
      };
    }),
  );
}

const LABELS: Record<
  WorkshopLanguage,
  {
    details: string;
    language: string;
    location: Record<'online', string>;
    workshop: string;
  }
> = {
  en: {
    details: 'Details',
    language: '🇬🇧 English',
    location: { online: 'Online' },
    workshop: 'Workshop',
  },
  fr: {
    details: 'Détails',
    language: '🇫🇷 Français',
    location: { online: 'En ligne' },
    workshop: 'Formation',
  },
};

/**
 * "DEC 08": the same short English tile for every language, like a calendar.
 */
function formatDateTile(session: Session): string {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  })
    .format(new Date(`${session.startDate}T00:00:00Z`))
    .toUpperCase();
}
