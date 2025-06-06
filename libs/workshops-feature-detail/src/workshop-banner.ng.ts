import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-banner',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="banner-image" [style.backgroundImage]="backgroundImage()"></div>
    <div class="banner-gradient"></div>
    <div class="content">
      <h1 class="title">{{ title() }}</h1>
      <h2 class="subtitle">🫒 Tapas Session · 1-Day Workshop</h2>
      <p class="badge">🗓️ Tuesday July 7th · 🐣 Early-Bird: €240</p>
      <p class="description">
        <span
          >Tired of whack-a-mole bugs, boring manual tests, and fragile
          suites?</span
        >
        <span
          >Let’s cook fast, reliable tests that actually help you ship.</span
        >
      </p>
      <div class="email-and-spots">
        <div class="email-container">
          <input type="email" placeholder="Enter your email address" />
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
      position: relative;
    }

    .banner-image {
      position: absolute;
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
      inset: 0;
    }

    .banner-gradient {
      position: absolute;
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(10, 10, 10, 0.5)
      );
      inset: 0;
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
      font-size: 1.3rem;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
    }

    .title,
    .subtitle {
      font-weight: bold;
      line-height: 1;
      text-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
    }

    .title {
      font-size: 3rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }

    .description {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      margin-bottom: 2rem;

      font-size: 1.5rem;
      line-height: 1.5;
    }

    .email-and-spots {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .email-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 600px;
      width: 100%;
      margin: 0 auto 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);
    }

    .email-container input {
      flex: 1;
      padding: 1rem;
      border: none;
      background: transparent;
      color: white;
      font-size: 1.2rem;
    }

    .email-container input::placeholder {
      color: rgba(255, 255, 255, 0.9);
    }

    .email-container button {
      margin: 1rem;
      padding: 0.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
    }

    .spots {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1rem;
      font-style: italic;
    }

    .down-arrow {
      animation: bounce 2s infinite;
      bottom: 1rem;
      margin: 0 0 2rem 0;
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
  pictureUri = input.required<string>();
  title = input.required<string>();
  protected backgroundImage = computed(() => `url(${this.pictureUri()})`);
}
