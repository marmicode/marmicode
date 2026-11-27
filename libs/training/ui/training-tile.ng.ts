import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
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
  imports: [Badge],
  template: `
    <article [attr.lang]="training().language">
      <div class="chips">
        @for (chip of languageChips(); track chip.code) {
          <mc-badge class="language-chip">
            <span aria-hidden="true">{{ chip.flag }}</span>
            {{ chip.code }}
          </mc-badge>
        }
      </div>
      <h3>{{ training().title }}</h3>
    </article>
  `,
})
export class TrainingTile {
  training = input.required<TrainingTileData>();
  /** 'card' = workshop grid card; 'wide' = picture left, text right (cohort, video course). */
  layout = input<'card' | 'wide'>('card');
  /** Accent border + glow, used for the cohort. */
  highlighted = input(false);

  protected languageChips = computed(() =>
    this.training().languages.map((language) => LANGUAGE_CHIPS[language]),
  );
}

const LANGUAGE_CHIPS: Record<TrainingLanguage, { flag: string; code: string }> =
  {
    en: { flag: '🇬🇧', code: 'EN' },
    fr: { flag: '🇫🇷', code: 'FR' },
  };
