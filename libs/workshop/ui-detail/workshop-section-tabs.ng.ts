import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

/**
 * Sticky in-page links (Overview, Sessions, What you will learn, Program, FAQ).
 * The page gives its sections these ids: `overview`, `sessions`, `learn`, `program`, `faq`.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-section-tabs',
  imports: [RouterLink],
  template: `
    <nav [attr.aria-label]="labels().onThisPage">
      @for (tab of tabs(); track tab.fragment) {
        <a [routerLink]="[]" [fragment]="tab.fragment">{{ tab.label }}</a>
      }
    </nav>
  `,
  styles: `
    :host {
      position: sticky;
      top: 88px;
      z-index: 5;
      display: block;
    }

    nav {
      display: flex;
      gap: 4px;
      width: max-content;
      max-width: 100%;
      padding: 4px;
      overflow-x: auto;
      border: 1px solid var(--mc-dark-line);
      border-radius: 14px;
      background: rgba(26, 17, 32, 0.88);
      backdrop-filter: blur(16px) saturate(150%);
      -webkit-backdrop-filter: blur(16px) saturate(150%);
      scrollbar-width: none;
    }

    a {
      padding: 8px 14px;
      border-radius: 10px;
      color: var(--mc-dark-muted);
      font-size: 14px;
      text-decoration: none;
      white-space: nowrap;
    }

    a:hover {
      background: rgba(255, 255, 255, 0.06);
      color: var(--mc-dark-text);
    }

    a:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: -2px;
    }
  `,
})
export class WorkshopSectionTabs {
  language = input.required<WorkshopLanguage>();

  protected labels = computed(() => WORKSHOP_DETAIL_LABELS[this.language()]);
  protected tabs = computed(() => {
    const labels = this.labels();
    return [
      { fragment: 'overview', label: labels.overviewTab },
      { fragment: 'sessions', label: labels.sessionsTab },
      { fragment: 'learn', label: labels.whatYouWillLearn },
      { fragment: 'program', label: labels.program },
      { fragment: 'faq', label: labels.faqTab },
    ];
  });
}
