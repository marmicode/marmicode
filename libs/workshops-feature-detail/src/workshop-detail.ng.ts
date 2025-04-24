import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { PageComponent as Page } from '@marmicode/shared-ui';
import { PageInfo } from 'libs/shared-ui/src/lib/page.component';

// TODO fix this
// @ts-ignore
import pragmaticAngularTestingPictureUri from './workshops/pragmatic-angular-testing.png';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-banner',
  template: `
    <div class="banner-image" [style.backgroundImage]="backgroundImage()"></div>
    <div class="content">
      <div class="coming-soon">Coming Soon • Summer 2025</div>
      <h1 class="title">{{ title() }}</h1>
      <p class="subtitle">🫒 Tapas Session</p>
      <p class="description">TODO TODO</p>
      <div class="email-container">
        <input
          type="email"
          class="email-input"
          placeholder="Enter your email address"
        />
        <div class="button-group">
          <button class="action-button send">🚀</button>
        </div>
      </div>
      <p class="spots">
        Limited spots available. Be the first to know when registration opens.
      </p>
    </div>
  `,
  styles: `
    :host {
      position: relative;
    }

    .banner-image {
      position: absolute;
      background-attachment: fixed;
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

    .coming-soon {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      margin-bottom: 2rem;
    }

    .title {
      font-size: 3rem;
      line-height: 1;
      font-weight: bold;
    }

    .subtitle {
      margin-top: 2rem;
      font-size: 2rem;
      font-style: italic;
      font-weight: bold;
    }

    .description {
      margin-top: 2rem;
      margin-bottom: 2rem;

      font-size: 1.5rem;
      line-height: 1.5;
    }

    .email-container {
      display: flex;
      gap: 1rem;
      max-width: 600px;
      margin: 0 auto 1rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.5rem;
      border-radius: 8px;
    }

    .email-input {
      flex: 1;
      padding: 1rem;
      border: none;
      background: transparent;
      color: white;
      font-size: 1.2rem;
    }

    .email-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .button-group {
      display: flex;
      gap: 0.5rem;
    }

    .action-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.2rem;
      background: rgba(255, 255, 255, 0.2);
    }

    .spots {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
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
  imports: [Page, WorkshopBanner],
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
