import {
  CurrencyPipe,
  NgPlural,
  NgPluralCase,
  TitleCasePipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FixedBackground } from './fixed-background.ng';
import { Workshop } from '../core/workshop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-banner',
  imports: [
    CurrencyPipe,
    FixedBackground,
    MatButtonModule,
    MatIconModule,
    NgPlural,
    NgPluralCase,
    TitleCasePipe,
  ],
  template: `
    <mc-fixed-background [pictureUri]="workshop().pictureUri" />
    <div class="content">
      <h1 class="title">{{ workshop().title }}</h1>
      <h2 class="subtitle">
        <span>{{ workshopType() }}</span>
        <span> · </span>
        <span [ngPlural]="workshop().duration">
          <ng-template ngPluralCase="=1">1 Day</ng-template>
          <ng-template ngPluralCase="other"
            >{{ workshop().duration }} Days</ng-template
          >
        </span>
        <span> Workshop</span>
        <span> · </span>
        <span>{{ workshop().location | titlecase }}</span>
      </h2>
      <p class="badge">
        {{ offerType() }} Starts at
        {{ workshop().offer.price | currency: 'EUR' : true : '1.0-0' }}
      </p>
      <p class="subheading">
        @for (line of subheadingLines(); track line) {
          <span>{{ line }}</span>
        }
      </p>
      <div class="email-and-spots">
        <div class="email-form">
          <!-- TODO: Re-enable input when the backend is ready. -->
          <!-- <input type="email" placeholder="Drop your email here" /> -->
          <a
            [href]="waitlistMailtoUrl()"
            mat-button
            color="accent"
            target="_blank"
          >
            <mat-icon>notifications</mat-icon>
            JOIN THE WAITLIST
          </a>
        </div>
        <p class="spots">
          Only 20 spots available. Be the first to know when registration opens.
        </p>
      </div>
      <mat-icon class="down-arrow">keyboard_arrow_down</mat-icon>
    </div>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      font-size: 1rem;
    }

    .content {
      display: flex;
      position: relative;
      min-height: calc(100vh - 64px);
      padding-top: 2rem;

      flex-direction: column;
      align-items: center;
      justify-content: end;

      color: white;
      text-align: center;

      animation: fadeScaleIn 0.3s ease-out forwards;
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

    .title,
    .subtitle {
      font-weight: bold;
      line-height: 1;
      text-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
    }

    .title {
      font-size: 3em;
    }

    .subtitle {
      font-size: 1.5em;
    }

    .subheading {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      margin-bottom: 2rem;

      font-size: 1.5em;
      line-height: 1.5;
    }

    .email-and-spots {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }

    .email-form {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0 0 1rem 0;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);
    }

    .email-form input {
      flex: 10 1 auto;
      padding: 1rem;
      border: none;
      background: transparent;
      color: white;
      font-size: 1.2em;
    }

    .email-form input::placeholder {
      color: rgba(255, 255, 255, 0.9);
    }

    .email-form a {
      flex: 1 0 auto;
      margin-right: 1rem;
      padding: 0.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
    }

    .spots {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1em;
      font-style: italic;
    }

    .down-arrow {
      animation: bounce 2s infinite;
      bottom: 1rem;
      margin: 0 0 3rem 0;
    }

    @media (max-width: 599.98px) {
      :host {
        font-size: 0.75rem;
      }

      .email-form {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        margin: 0 10px;
      }
    }

    @keyframes fadeScaleIn {
      from {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes bounce {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }
  `,
})
export class WorkshopBanner {
  workshop = input.required<Workshop>();
  waitlistMailtoUrl = input.required<string>();

  protected subtitle = computed(() => {
    const duration = this.workshop().duration;
    const typeStr =
      this.workshop().type === 'tapas' ? '🫒 Tapas Session' : '🍽️ Full Course';
    const durationStr = duration === 1 ? '1-Day' : `${duration}-Days`;
    return `${typeStr} · ${durationStr} Workshop · ${this.workshop().location}`;
  });
  protected workshopType = computed(() => {
    return this.workshop().type === 'tapas'
      ? '🫒 Tapas Session'
      : '🍽️ Full Course';
  });
  protected offerType = computed(() => {
    const offer = this.workshop().offer;
    return offer.type === 'early-bird' ? '🐣 Early Bird' : '⏰ Last Minute';
  });
  protected subheadingLines = computed(() =>
    this.workshop().subheading.split('\n'),
  );
}
