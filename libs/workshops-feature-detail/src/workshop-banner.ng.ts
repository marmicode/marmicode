import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FixedBackground } from './fixed-background.ng';
import { Workshop } from './workshop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-banner',
  imports: [MatButtonModule, MatIconModule, DatePipe, FixedBackground],
  template: `
    <mc-fixed-background [pictureUri]="workshop().pictureUri" />
    <div class="content">
      <h1 class="title">{{ workshop().title }}</h1>
      <h2 class="subtitle">{{ subtitle() }}</h2>
      <p class="badge">
        🗓️ {{ (workshop().nextSessionDate | date: 'longDate') ?? 'TBD' }} ·
        {{ offerStr() }}
      </p>
      <p class="subheading">
        @for (line of subheadingLines(); track line) {
          <span>{{ line }}</span>
        }
      </p>
      <div class="email-and-spots">
        <div class="email-form">
          <input type="email" placeholder="Drop your email here" />
          <button mat-button color="accent">
            <mat-icon>notifications</mat-icon>
            JOIN THE WAITLIST
          </button>
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

      flex-direction: column;
      align-items: center;
      justify-content: end;

      color: white;
      text-align: center;
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
      flex: 1;
      padding: 1rem;
      border: none;
      background: transparent;
      color: white;
      font-size: 1.2em;
    }

    .email-form input::placeholder {
      color: rgba(255, 255, 255, 0.9);
    }

    .email-form button {
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

  protected subtitle = computed(() => {
    const duration = this.workshop().duration;
    const typeStr =
      this.workshop().type === 'tapas' ? '🫒 Tapas Session' : '🍽️ Full Course';
    const durationStr = duration === 1 ? '1-Day' : `${duration}-Days`;
    return `${typeStr} · ${durationStr} Workshop · ${this.workshop().location}`;
  });
  protected offerStr = computed(() => {
    const offer = this.workshop().offer;
    const typeStr =
      offer.type === 'early-bird' ? '🐣 Early-Bird' : '⏰ Last-Minute';
    return `${typeStr}: €${offer.price}`;
  });
  protected subheadingLines = computed(() =>
    this.workshop().subheading.split('\n'),
  );
}
