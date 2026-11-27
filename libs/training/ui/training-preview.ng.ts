import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Link } from '@marmicode/shared/ui';
import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';
import { formatPrice } from './format-price';
import {
  TRAINING_FORMAT_EMOJIS,
  TRAINING_FORMAT_LABELS,
} from './training-format.i18n';

/**
 * What a card in the list of trainings shows:
 * workshops, cohorts and video courses alike.
 */
export interface TrainingPreviewData {
  id: string;
  format: TrainingFormat;
  language: TrainingLanguage;
  title: string;
  subheading: string;
  thumbnailUri: string;
  pictureAltText: string;
  /**
   * Already localized, e.g. "3 Days", "6 Weeks" or "4.5 Hours".
   */
  duration: string;
  /**
   * The lowest price, shown as "From €120".
   */
  price: number;
  /**
   * An internal route, or an external URL that opens in a new tab.
   */
  link: Link;
  viewTransitionName?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-preview',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    UpperCasePipe,
  ],
  template: `
    <mat-card class="card" role="article" [attr.lang]="training().language">
      <img
        [alt]="training().pictureAltText"
        [src]="training().thumbnailUri"
        [style.view-transition-name]="training().viewTransitionName"
      />
      <span class="chip format-chip">
        <span aria-hidden="true">{{ format().emoji }}</span>
        {{ format().label }}
      </span>
      <span class="chip language-chip">
        <span class="chip-flag" aria-hidden="true">{{
          languageChip().flag
        }}</span>
        <span class="chip-code" aria-hidden="true">{{
          languageChip().code
        }}</span>
        <span class="visually-hidden">{{ languageChip().label }}</span>
      </span>
      <mat-card-content class="content">
        <h3 class="title">
          <!-- The title link covers the whole card, so the card is clickable. -->
          @if (href(); as href) {
            <a class="title-link" [href]="href" rel="noopener" target="_blank">
              {{ training().title }}
            </a>
          } @else {
            <a class="title-link" [routerLink]="route()">
              {{ training().title }}
            </a>
          }
        </h3>

        <p class="subheading">{{ training().subheading }}</p>

        <div class="mc-flex"></div>

        <div class="details">
          <span class="duration">
            <mat-icon>schedule</mat-icon>
            {{ training().duration }}
          </span>
          <span class="price">{{ labels().from }} {{ formattedPrice() }}</span>
        </div>

        <div class="actions">
          @if (href(); as href) {
            <a matButton="outlined" [href]="href" rel="noopener" target="_blank"
              >{{ labels().viewDetails | uppercase }}
              <mat-icon iconPositionEnd>open_in_new</mat-icon></a
            >
          } @else {
            <a matButton="outlined" [routerLink]="route()">{{
              labels().viewDetails | uppercase
            }}</a>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  host: {
    '[class.mc-flex-column]': 'true',
  },
  styles: `
    .card {
      position: relative;
      overflow: hidden;
      flex: 1;
    }

    .card:has(.title-link:hover) {
      box-shadow: var(--mat-sys-level3);
    }

    .chip {
      position: absolute;
      top: 0.75rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.65rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
      font-size: 1rem;
      font-weight: 700;
      color: var(--marmicode-primary-color);
    }

    .format-chip {
      left: 0.75rem;
    }

    .language-chip {
      right: 0.75rem;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .chip-flag {
      line-height: 1;
      font-size: 1.7rem;
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .title {
      color: var(--marmicode-primary-color);
      font-weight: 700;
      font-size: 24px;
      line-height: 1.4;
      margin: 1rem 0;
      text-align: center;
    }

    .title-link {
      color: inherit;
      text-decoration: none;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      &:focus-visible {
        outline: none;

        &::after {
          outline: 2px solid var(--marmicode-accent-color);
          outline-offset: -2px;
          border-radius: inherit;
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .subheading {
      margin-top: 0;
      margin-bottom: 0.7em;
      font-size: 1.1em;
      color: #444;
    }

    .details {
      display: flex;
      gap: 2em;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.7em;
      font-size: 1.1em;
      color: var(--marmicode-accent-color);
      font-weight: 500;
      padding: 0.4em 1em;
    }

    .duration {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    .actions {
      /* Above the title link that covers the card. */
      position: relative;
      text-align: center;
    }
  `,
})
export class TrainingPreview {
  training = input.required<TrainingPreviewData>();

  protected labels = computed(
    () => TRAINING_PREVIEW_LABELS[this.training().language],
  );
  protected format = computed(() => {
    const { format, language } = this.training();
    return {
      emoji: TRAINING_FORMAT_EMOJIS[format],
      label: TRAINING_FORMAT_LABELS[language][format],
    };
  });
  protected languageChip = computed(
    () => LANGUAGE_CHIPS[this.training().language],
  );
  protected formattedPrice = computed(() =>
    formatPrice({
      price: this.training().price,
      locale: this.training().language,
    }),
  );
  protected href = computed(() => {
    const link = this.training().link;
    return 'href' in link ? link.href : undefined;
  });
  protected route = computed(() => {
    const link = this.training().link;
    return 'route' in link ? link.route : undefined;
  });
}

const TRAINING_PREVIEW_LABELS: Record<
  TrainingLanguage,
  { from: string; viewDetails: string }
> = {
  en: { from: 'From', viewDetails: 'View details' },
  fr: { from: 'À partir de', viewDetails: "Plus d'infos" },
};

const LANGUAGE_CHIPS: Record<
  TrainingLanguage,
  { flag: string; code: string; label: string }
> = {
  en: { flag: '🇬🇧', code: 'EN', label: 'Language: English' },
  fr: { flag: '🇫🇷', code: 'FR', label: 'Langue : français' },
};
