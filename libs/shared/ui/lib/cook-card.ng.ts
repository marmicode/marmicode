import { ChangeDetectionStrategy, Component } from '@angular/core';
import cookPictureUri from './cook.webp';

/**
 * Dark horizontal block: photo left, bio right, credential chips (home, workshop, cohort).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cook-card',
  template: `
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
        <p>I am a Software Cook who enjoys whipping code until tests pass.</p>
        <p>
          <b>With nearly 20 years of experience in eXtreme Programming</b>, I've
          coached dozens of teams and trained thousands of developers to cook
          robust and maintainable software — using
          <b>Test-Driven Development</b>, <b>pragmatic testing strategies</b>,
          and a healthy dose of <b>Collective Ownership</b>.
        </p>

        <p>
          I'm also an <b>Angular Google Developer Expert</b>, an
          <b>NX Champion</b>, and a mediocre sailor.
        </p>
        <ul class="chips">
          <li>Angular GDE</li>
          <li>Nx Champion</li>
          <li>XP coach</li>
          <li>Mediocre sailor ⛵</li>
        </ul>
      </div>
    </div>
  `,
  styles: `
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
    }

    .chips li {
      padding: 6px 12px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      color: var(--mc-dark-muted);
      font-size: 13px;
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
  cookPictureUri = cookPictureUri;
  cookPictureAlt =
    'Younes Jaaidi wearing a red apron and holding wooden cooking spoons, standing in a kitchen-themed setup with jars of fairy lights and programming stickers (JavaScript, TypeScript, Angular, Nx, RxJS) on a shelf behind him.';
}
