import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { Workshop, WorkshopLanguage } from '@marmicode/workshop/core';
import { formatPrice } from './format-price';
import { WORKSHOP_PREVIEW_LABELS } from './workshop-preview.i18n';
import { workshopViewTransitionName } from './workshop-view-transition-name';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-preview',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
  ],
  template: `
    <mat-card
      [routerLink]="workshopRouterHelper.detail(workshop().id)"
      class="card"
      role="article"
    >
      <img
        [alt]="workshop().pictureAltText"
        [src]="workshop().thumbnailUri"
        [style.view-transition-name]="transitionName()"
      />
      @if (languageChip(); as chip) {
        <span
          class="language-chip"
          [attr.aria-label]="'Language: ' + chip.code"
        >
          <span class="chip-flag">{{ chip.flag }}</span>
          <span class="chip-code">{{ chip.code }}</span>
        </span>
      }
      <mat-card-content class="content">
        <div class="header">
          <h3 class="title">{{ workshop().shortTitle }}</h3>
        </div>

        <p class="subheading">{{ workshop().subheading }}</p>

        <div class="mc-flex"></div>

        <div class="details">
          <span class="duration">
            <mat-icon>schedule</mat-icon>
            <ng-container [ngPlural]="workshop().duration">
              <ng-template ngPluralCase="=1">1 {{ labels().day }}</ng-template>
              <ng-template ngPluralCase="other">
                {{ workshop().duration }} {{ labels().days }}
              </ng-template>
            </ng-container>
          </span>
          <span class="price">{{ labels().from }} {{ formattedPrice() }} </span>
        </div>

        <div class="actions">
          <a
            [routerLink]="workshopRouterHelper.detail(workshop().id)"
            matButton="outlined"
            >{{ labels().viewDetails | uppercase }}</a
          >
        </div>
      </mat-card-content>
    </mat-card>
  `,
  host: {
    '[class.mc-flex-column]': 'true',
  },
  styles: `
    .card {
      cursor: pointer;
      overflow: hidden;
      flex: 1;
    }

    .language-chip {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.65rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
      font-size: 1rem;
    }

    .chip-flag {
      line-height: 1;
      font-size: 1.7rem;
    }

    .chip-code {
      font-weight: 700;
      color: var(--marmicode-primary-color);
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .header {
      text-align: center;
      margin: 1rem 0;
    }

    .title {
      color: var(--marmicode-primary-color);
      font-weight: 700;
      font-size: 24px;
      line-height: 1.4;
      margin: 0;
    }

    .type {
      font-size: 1.2rem;
      color: #444;
      font-style: italic;
      font-weight: 500;
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
      border-radius: 12px;
      padding: 0.4em 1em;
    }
    .duration {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .price {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .actions {
      text-align: center;
    }
  `,
})
export class WorkshopPreview {
  workshop = input.required<Workshop>();

  transitionName = computed(() => workshopViewTransitionName(this.workshop()));
  labels = computed(() => WORKSHOP_PREVIEW_LABELS[this.workshop().language]);
  languageChip = computed(() => this._languageChips[this.workshop().language]);
  formattedPrice = computed(() =>
    formatPrice({
      price: this.workshop().offer.price,
      locale: this.workshop().language,
    }),
  );
  workshopRouterHelper = workshopRouterHelper;

  private _languageChips: Record<
    WorkshopLanguage,
    { flag: string; code: string }
  > = {
    en: { flag: '🇬🇧', code: 'EN' },
    fr: { flag: '🇫🇷', code: 'FR' },
  };
}
