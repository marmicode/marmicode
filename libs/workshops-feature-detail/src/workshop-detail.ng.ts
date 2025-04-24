import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageComponent, PageInfo } from '@marmicode/shared-ui';

// TODO fix this
// @ts-ignore
import pragmaticAngularTestingPictureUri from './workshops/pragmatic-angular-testing.png';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-banner',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="banner-image" [style.backgroundImage]="backgroundImage()"></div>
    <div class="content">
      <div class="badge">Tickets opening soon • Tuesday July 7th</div>
      <h1 class="title">{{ title() }}</h1>
      <p class="badge">🫒 Tapas Session • 1-Day Workshop</p>
      <p class="description">From messy soup to test-driven cooking</p>
      <div class="email-and-spots">
        <div class="email-container">
          <input type="email" placeholder="Enter your email address" />
          <button mat-button color="accent">
            <mat-icon>notifications</mat-icon>
            NOTIFY ME
          </button>
        </div>
        <p class="spots">
          Limited spots available. Be the first to know when registration opens.
        </p>
      </div>
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
      filter: brightness(0.5);
      inset: 0;
    }

    .content {
      display: flex;
      position: relative;
      min-height: 600px;

      flex-direction: column;
      align-items: center;
      justify-content: center;

      color: white;
      text-align: center;
    }

    .badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      margin-bottom: 2rem;

      background: rgba(56, 0, 48, 0.6);
      font-size: 1rem;
      font-style: italic;
    }

    .title {
      font-size: 3rem;
      line-height: 1;
      font-weight: bold;
    }

    .description {
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
  `,
})
export class WorkshopBanner {
  pictureUri = input.required<string>();
  title = input.required<string>();
  protected backgroundImage = computed(() => `url(${this.pictureUri()})`);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-detail-page',
  standalone: true,
  imports: [PageComponent, WorkshopBanner],
  template: `
    <mc-page [info]="info()">
      <mc-workshop-banner
        [pictureUri]="info().pictureUri"
        [title]="info().title"
      />
    </mc-page>
  `,
})
export class WorkshopDetailPage {
  info = signal<PageInfo>({
    title: 'Pragmatic Angular Testing Workshop',
    pictureUri: pragmaticAngularTestingPictureUri,
  });
}
