import {
  NgPlural,
  NgPluralCase,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Hero } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { formatPrice } from '@marmicode/workshop/ui';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';
import { UPCOMING_SESSIONS_SECTION_ID } from './workshop-sessions.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-hero',
  imports: [
    Hero,
    MatButtonModule,
    MatIconModule,
    NgPlural,
    NgPluralCase,
    RouterLink,
    TitleCasePipe,
    UpperCasePipe,
  ],
  template: `
    <mc-hero [pictureUri]="workshop().pictureUri" [title]="workshop().title">
      <ng-content slot="subtitle">
        <span [ngPlural]="workshop().duration">
          <ng-template ngPluralCase="=1">1 {{ labels().day }}</ng-template>
          <ng-template ngPluralCase="other"
            >{{ workshop().duration }} {{ labels().days }}</ng-template
          >
        </span>
        <span> · </span>
        <span>{{ workshop().location | titlecase }}</span>
      </ng-content>

      <ng-content slot="content">
        <p class="badge">
          {{ offerType() }} {{ labels().priceStartsAt }}
          {{ formattedPrice() }}
        </p>
        <p class="subheading">
          @for (line of subheadingLines(); track line) {
            <span>{{ line }}</span>
          }
        </p>
        <div class="actions">
          @if (workshop().waitlistUrl; as waitlistUrl) {
            <a [href]="waitlistUrl" matButton="filled" target="_blank">
              <mat-icon>notifications</mat-icon>
              {{ labels().joinWaitlist | uppercase }}
            </a>
          } @else {
            <a
              [routerLink]="[]"
              [fragment]="upcomingSessionsSectionId"
              matButton="filled"
            >
              <mat-icon>calendar_month</mat-icon>
              {{ labels().bookASession | uppercase }}
            </a>
          }
          <a
            [href]="workshop().customSessionRequestUrl"
            class="secondary"
            matButton
            target="_blank"
          >
            <mat-icon>build</mat-icon>
            {{ labels().requestACustomSession | uppercase }}
          </a>
        </div>
        @if (workshop().language === 'fr') {
          <div class="bottom-note">
            🇫🇷 Formation finançable jusqu'à 100% via OPCO.
          </div>
        }
      </ng-content>
    </mc-hero>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      display: block;
      position: relative;

      @include mat.button-overrides(
        (
          filled-container-color: var(--marmicode-accent-bright-color),
          filled-label-text-color: black,
          text-label-text-color: var(--marmicode-accent-bright-color),
        )
      );

      @media (max-width: 599.98px) {
        font-size: 0.75rem;
      }
    }

    .badge {
      padding: 0.5rem 1rem;
      margin: 1.5rem 0;
      border-radius: 20px;
      margin-bottom: 0.7rem;

      background: rgba(56, 0, 48, 0.6);
      font-size: 1.3em;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
    }

    .subheading {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      margin-bottom: 2rem;

      font-size: 1.5em;
      line-height: 1.5;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      @media (max-width: 599.98px) {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .actions a {
      flex: 1 0 auto;
      padding: 1.2rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;

      &.secondary {
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);
      }
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
  labels = computed(() => WORKSHOP_DETAIL_LABELS[this.workshop().language]);
  upcomingSessionsSectionId = UPCOMING_SESSIONS_SECTION_ID;
  offerType = computed(() => {
    const { offer } = this.workshop();
    return offer.type === 'early-bird' ? '🐣 Early Bird' : '⏰ Last Minute';
  });
  subheadingLines = computed(() => this.workshop().subheading.split('\n'));
  formattedPrice = computed(() =>
    formatPrice({
      price: this.workshop().offer.price,
      locale: this.workshop().language,
    }),
  );
}
