import { NgPlural, NgPluralCase, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { LinkComponent } from '@marmicode/shared/ui';
import {
  TrainingAction,
  TrainingHero,
  TrainingHeroPill,
} from '@marmicode/training/ui';
import { Workshop, WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';
import { UPCOMING_SESSIONS_SECTION_ID } from './workshop-sessions.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-hero',
  imports: [
    LinkComponent,
    NgPlural,
    NgPluralCase,
    TitleCasePipe,
    TrainingAction,
    TrainingHero,
    TrainingHeroPill,
  ],
  template: `
    <mc-training-hero [training]="workshop()">
      <ng-container slot="subtitle">
        <span [ngPlural]="workshop().duration">
          <ng-template ngPluralCase="=1">1 {{ labels().day }}</ng-template>
          <ng-template ngPluralCase="other"
            >{{ workshop().duration }} {{ labels().days }}</ng-template
          >
        </span>
        <span> · </span>
        <span>{{ workshop().location | titlecase }}</span>
      </ng-container>

      @if (nextSessionLabel(); as nextSessionLabel) {
        <mc-training-hero-pill
          slot="status"
          [segments]="[
            labels().nextSession,
            nextSessionLabel,
            labels().limitedSpots,
          ]"
        />
      }

      @if (!workshop().waitlist) {
        <mc-training-action
          slot="actions"
          icon="calendar_month"
          [fragment]="upcomingSessionsSectionId"
          [label]="labels().bookASession"
        />
      }
      <mc-training-action
        slot="actions"
        icon="build"
        variant="secondary"
        [href]="workshop().customSessionRequestUrl"
        [label]="labels().requestACustomSession"
      />

      @for (alternate of alternateWorkshops(); track alternate) {
        <mc-link
          slot="note"
          class="actions-note"
          color="white"
          [route]="alternate.route"
        >
          <span>{{ alternate.flag }}</span>
          <span class="actions-note-text">{{ alternate.text }}</span>
          <span>→</span>
        </mc-link>
      }

      @if (workshop().language === 'fr') {
        <p slot="footer" class="bottom-note">
          🇫🇷 Formation finançable jusqu'à 100% via OPCO.
        </p>
      }
    </mc-training-hero>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }

    .actions-note {
      display: block;
      margin: 1rem 0;
    }

    .actions-note-text {
      margin: 0 0.5rem;
      text-decoration: underline;
      text-decoration-color: rgba(255, 255, 255, 0.4);
      text-underline-offset: 4px;
    }

    .bottom-note {
      color: white;
      font-size: 1.3rem;
      text-align: center;
      margin-bottom: 2rem;
    }
  `,
})
export class WorkshopHero {
  workshop = input.required<Workshop>();

  alternateWorkshops = computed(() =>
    this.workshop().alternates?.map((alternate) => ({
      flag: this._languageFlags[alternate.language],
      text: this._alsoAvailableInLanguageTexts[alternate.language],
      route: workshopRouterHelper.detail(alternate.id),
    })),
  );
  labels = computed(() => WORKSHOP_DETAIL_LABELS[this.workshop().language]);
  nextSessionLabel = computed(() => {
    const { language, waitlist } = this.workshop();
    if (!waitlist?.nextSessionMonth) {
      return null;
    }
    const [year, month] = waitlist.nextSessionMonth.split('-').map(Number);
    return new Intl.DateTimeFormat(language, {
      month: 'long',
      year: 'numeric',
    }).format(new Date(year, month - 1));
  });
  upcomingSessionsSectionId = UPCOMING_SESSIONS_SECTION_ID;

  private _languageFlags: Record<WorkshopLanguage, string> = {
    en: '🇬🇧',
    fr: '🇫🇷',
  };

  private _alsoAvailableInLanguageTexts: Record<WorkshopLanguage, string> = {
    en: 'Also available in english',
    fr: 'Également disponible en français',
  };
}
