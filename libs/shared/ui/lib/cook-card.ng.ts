import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import cookPictureUri from './cook.webp';
import gdePictureUri from './gde.webp';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cook-card',
  imports: [MatCard, MatCardContent, NgTemplateOutlet],
  template: `
    @if (appearance() === 'banner') {
      <div class="banner">
        <img
          [src]="cookPictureUri"
          class="banner-picture"
          [alt]="cookPictureAlt"
          height="400"
        />
        <div>
          <span class="mc-eyebrow">// the cook</span>
          <h3>Younes Jaaidi</h3>
          <ng-container *ngTemplateOutlet="bio" />
          <ul class="chips">
            <li>Angular GDE</li>
            <li>Nx Champion</li>
            <li>XP coach</li>
            <li>Mediocre sailor ⛵</li>
          </ul>
        </div>
      </div>
    } @else {
      <mat-card class="card">
        <div class="picture-container">
          <img
            [src]="cookPictureUri"
            class="cook-picture"
            mat-card-image
            [alt]="cookPictureAlt"
            height="400"
          />
          <div class="badge-container">
            <img [src]="gdePictureUri" alt="Google Developer Expert badge" />
          </div>
        </div>
        <mat-card-content>
          <h3>Younes Jaaidi</h3>
          <ng-container *ngTemplateOutlet="bio" />
        </mat-card-content>
      </mat-card>
    }

    <ng-template #bio>
      <p>I am a Software Cook who enjoys whipping code until tests pass.</p>
      <p>
        <b>With nearly 20 years of experience in eXtreme Programming</b>, I've
        coached dozens of teams and trained thousands of developers to cook
        robust and maintainable software — using <b>Test-Driven Development</b>,
        <b>pragmatic testing strategies</b>, and a healthy dose of
        <b>Collective Ownership</b>.
      </p>

      <p>
        I'm also an <b>Angular Google Developer Expert</b>, an
        <b>NX Champion</b>, and a mediocre sailor.
      </p>
    </ng-template>
  `,
  styles: `
    .card {
      margin: auto;
      overflow: hidden;
      width: min(100%, 500px);
    }

    .picture-container {
      position: relative;
      height: 400px;
    }

    .cook-picture {
      object-fit: cover;
      object-position: 0% 20%;
    }

    .badge-container {
      position: absolute;
      height: 70px;
      width: 100%;
      bottom: 0;
      background-color: rgba(32, 52, 75, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 100%;
      }
    }

    .card h3 {
      font-weight: 700;
      font-size: 24px; /* Adjust depending on context */
      color: #111827; /* near-black */
      line-height: 1.4;
      margin-top: 1rem;
      text-align: center;
    }

    .card p {
      font-weight: 400;
      font-size: 16px;
      color: #6b7280; /* dark gray */
      line-height: 1.6;
      text-align: justify;
    }

    .banner {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 48px;
      align-items: center;
      padding: 28px;
      border: 1px solid var(--mc-dark-line);
      border-radius: 24px;
      background: var(--mc-dark-surface);
      color: var(--mc-dark-text);
    }

    .banner-picture {
      width: 100%;
      height: auto;
      aspect-ratio: 1;
      object-fit: cover;
      object-position: 30% 20%;
      border-radius: 16px;
    }

    .banner h3 {
      margin: 10px 0 12px;
      font-size: clamp(30px, 4vw, 46px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }

    .banner p {
      color: var(--mc-dark-muted);
      font-size: 17px;
    }

    .banner b {
      color: var(--mc-dark-text);
      font-weight: 600;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        padding: 6px 12px;
        border: 1px solid var(--mc-dark-line-strong);
        border-radius: 999px;
        color: var(--mc-dark-muted);
        font-size: 13px;
      }
    }

    @media (max-width: 760px) {
      .banner {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .banner-picture {
        aspect-ratio: 4 / 3;
      }
    }
  `,
})
export class CookCard {
  /**
   * 'card' = the current light card (old training pages).
   * 'banner' = dark horizontal block: photo left, bio right, credential chips (home, workshop, cohort).
   * Both render the same bio copy, so the text lives in one place.
   */
  appearance = input<'card' | 'banner'>('card');

  cookPictureUri = cookPictureUri;
  cookPictureAlt =
    'Younes Jaaidi wearing a red apron and holding wooden cooking spoons, standing in a kitchen-themed setup with jars of fairy lights and programming stickers (JavaScript, TypeScript, Angular, Nx, RxJS) on a shelf behind him.';
  gdePictureUri = gdePictureUri;
}
