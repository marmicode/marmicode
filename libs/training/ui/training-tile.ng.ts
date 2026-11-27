import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '@marmicode/shared/ui';
import { TrainingLanguage } from '@marmicode/training/core';
import { formatPrice } from './format-price';
import { TrainingTileData } from './training-tile-data';

/**
 * Dark training card. The title link covers the whole card, as in TrainingPreview.
 * Carries `lang`, and announces its languages in the card's own language (visually hidden).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-tile',
  imports: [Badge, RouterLink],
  host: {
    '[class.wide]': "layout() === 'wide'",
  },
  template: `
    <article
      class="mc-surface mc-surface-interactive"
      [class.mc-surface-highlighted]="highlighted()"
      [attr.lang]="training().language"
    >
      <img
        [alt]="training().pictureAltText"
        [src]="training().thumbnailUri"
        [style.view-transition-name]="training().viewTransitionName"
      />
      <div class="body">
        <div class="chips">
          @if (training().badge; as badge) {
            <mc-badge variant="highlight">{{ badge }}</mc-badge>
          }
          <mc-badge class="mono">{{ training().duration }}</mc-badge>
          @if (training().nextSessionDates; as nextSessionDates) {
            <mc-badge class="next-session mono" variant="accent">
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

        <p class="subheading">{{ training().subheading }}</p>

        <div class="foot">
          <span class="price">
            @if (showsFrom()) {
              <small>{{ labels().from }}</small>
            }
            {{ price() }}
            @if (originalPrice(); as originalPrice) {
              <s>{{ originalPrice }}</s>
            }
          </span>
          <span class="go" aria-hidden="true">
            {{ goLabel() }}
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  `,
  styles: `
    :host {
      display: flex;
    }

    article {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
      color: var(--mc-dark-text);
    }

    img {
      display: block;
      width: 100%;
      aspect-ratio: 3.2 / 1;
      object-fit: cover;
      border-bottom: 1px solid var(--mc-dark-line);
    }

    .body {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 10px;
      padding: 20px 22px 22px;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .mono {
      font-family: var(--mc-font-mono);
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    h3 {
      margin: 0;
      font-size: 19px;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.25;
    }

    .title-link {
      color: inherit;
      text-decoration: none;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
      }

      &:focus-visible {
        outline: none;

        &::after {
          outline: 2px solid var(--mc-accent);
          outline-offset: -2px;
        }
      }
    }

    .subheading {
      display: -webkit-box;
      overflow: hidden;
      margin: 0;
      color: var(--mc-dark-muted);
      font-size: 14.5px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    .foot {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid var(--mc-dark-line);
    }

    .price {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-size: 17px;
      font-weight: 600;

      small {
        color: var(--mc-dark-muted);
        font-size: 13px;
        font-weight: 400;
      }

      s {
        color: var(--mc-dark-muted);
        font-size: 14px;
        font-weight: 400;
      }
    }

    .go {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--mc-dark-muted);
      font-size: 14px;
      font-weight: 600;
    }

    article:hover .go {
      color: var(--mc-accent-bright);
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

    /* Wide: picture left, text right (cohort, video course). */
    :host(.wide) {
      article {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
        border-radius: 22px;
      }

      img {
        height: 100%;
        min-height: 200px;
        aspect-ratio: auto;
        border-bottom: none;
      }

      article.mc-surface-highlighted img {
        min-height: 240px;
      }

      .body {
        gap: 12px;
        padding: 28px 30px;
      }

      h3 {
        font-size: clamp(24px, 2.6vw, 32px);
        font-weight: 650;
        letter-spacing: -0.03em;
        line-height: 1.1;
      }

      .subheading {
        display: block;
        font-size: inherit;
      }

      .foot {
        padding-top: 10px;
        border-top: none;
      }

      .go {
        color: inherit;
        font-size: 15px;
      }
    }

    @media (max-width: 820px) {
      :host(.wide) {
        article {
          grid-template-columns: 1fr;
        }

        img,
        article.mc-surface-highlighted img {
          height: auto;
          min-height: 0;
          aspect-ratio: 3.2 / 1;
        }

        article.mc-surface-highlighted img {
          aspect-ratio: 16 / 9;
        }
      }
    }
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
  protected price = computed(() =>
    formatPrice({
      price: this.training().price,
      locale: this.training().language,
    }),
  );
  protected originalPrice = computed(() => {
    const { originalPrice, language } = this.training();
    return originalPrice != null
      ? formatPrice({ price: originalPrice, locale: language })
      : undefined;
  });
  /* The video course comes in several tiers, so its price is the lowest one. */
  protected showsFrom = computed(
    () => this.training().format === 'video-course',
  );
  protected goLabel = computed(() => {
    const labels = this.labels();
    switch (this.training().format) {
      case 'cohort':
        return labels.seeProgram;
      case 'video-course':
        return labels.startLearning;
      case 'workshop':
        return labels.details;
    }
  });
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
    details: string;
    from: string;
    language: string;
    languages: string;
    languageNames: Record<TrainingLanguage, string>;
    next: string;
    seeProgram: string;
    startLearning: string;
  }
> = {
  en: {
    details: 'Details',
    from: 'from',
    language: 'Language:',
    languages: 'Languages:',
    languageNames: { en: 'English', fr: 'French' },
    next: 'Next',
    seeProgram: 'See the program',
    startLearning: 'Start learning',
  },
  fr: {
    details: 'Détails',
    from: 'à partir de',
    language: 'Langue :',
    languages: 'Langues :',
    languageNames: { en: 'anglais', fr: 'français' },
    next: 'Prochaine',
    seeProgram: 'Voir le programme',
    startLearning: 'Commencer',
  },
};
