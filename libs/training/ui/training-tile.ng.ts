import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '@marmicode/shared/ui';
import { TrainingLanguage } from '@marmicode/training/core';
import { TrainingTileData } from './training-tile-data';

/**
 * Dark training card. The title link covers the whole card, as in TrainingPreview.
 * Carries `lang`, and announces its languages in the card's own language (visually hidden).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-tile',
  imports: [Badge, RouterLink],
  styles: `
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `,
  template: `
    <article [attr.lang]="training().language">
      <div class="chips">
        @if (training().nextSessionDates; as nextSessionDates) {
          <mc-badge class="next-session" variant="accent">
            {{ labels().next }} · {{ nextSessionDates }}
          </mc-badge>
        }
        @for (chip of languageChips(); track chip.code) {
          <mc-badge class="language-chip" aria-hidden="true">
            {{ chip.flag }} {{ chip.code }}
          </mc-badge>
        }
        <span class="visually-hidden">{{ languagesLabel() }}</span>
      </div>
      <h3>
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
    </article>
  `,
})
export class TrainingTile {
  training = input.required<TrainingTileData>();
  /** 'card' = workshop grid card; 'wide' = picture left, text right (cohort, video course). */
  layout = input<'card' | 'wide'>('card');
  /** Accent border + glow, used for the cohort. */
  highlighted = input(false);

  /* e.g. "Languages: English, French" or "Langue : français". */
  protected languagesLabel = computed(() => {
    const { language, languages } = this.training();
    const labels = TRAINING_TILE_LABELS[language];
    return `${languages.length > 1 ? labels.languages : labels.language} ${languages
      .map((offeredLanguage) => labels.languageNames[offeredLanguage])
      .join(', ')}`;
  });
  protected labels = computed(
    () => TRAINING_TILE_LABELS[this.training().language],
  );
  protected href = computed(() => {
    const link = this.training().link;
    return 'href' in link ? link.href : undefined;
  });
  protected route = computed(() => {
    const link = this.training().link;
    return 'route' in link ? link.route : undefined;
  });
  protected languageChips = computed(() =>
    this.training().languages.map((language) => LANGUAGE_CHIPS[language]),
  );
}

const LANGUAGE_CHIPS: Record<TrainingLanguage, { flag: string; code: string }> =
  {
    en: { flag: '🇬🇧', code: 'EN' },
    fr: { flag: '🇫🇷', code: 'FR' },
  };

const TRAINING_TILE_LABELS: Record<
  TrainingLanguage,
  {
    language: string;
    languages: string;
    languageNames: Record<TrainingLanguage, string>;
    next: string;
  }
> = {
  en: {
    language: 'Language:',
    languages: 'Languages:',
    languageNames: { en: 'English', fr: 'French' },
    next: 'Next',
  },
  fr: {
    language: 'Langue :',
    languages: 'Langues :',
    languageNames: { en: 'anglais', fr: 'français' },
    next: 'Prochaine',
  },
};
