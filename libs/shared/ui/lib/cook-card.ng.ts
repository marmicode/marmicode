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
        <p>
          I'm a Software Cook who enjoys making agents whip code until tests
          pass.
        </p>
        <p>
          <b>Raised in the eXtreme Programming kitchen 20 years ago</b>, I've
          since coached dozens of teams (perhaps yours next) and trained
          thousands of developers to build that trust, with ingredients such as
          <b>Test-Driven Development</b>, <b>Charted Coding</b>, and
          <b>Collective Ownership</b>.
        </p>
        <p class="spice">
          My favorite spice: <code>/charted-autopilot</code>
        </p>
        <ul class="chips">
          <li>Angular GDE</li>
          <li>Nx Champion</li>
          <li>XP coach</li>
          <li>Mediocre sailor ⛵</li>
        </ul>
      </div>
      <div class="motto">
        <span class="mc-eyebrow">// what I believe</span>
        <p>
          It's easy to build software that works, and agents made it even
          easier.<br />
          It's harder to keep it working.<br />
          The real challenge is doing so at a predictable cost.<br />
          That takes <b>trust</b>: in your agents, in your tests, in your
          software, and in each other.
        </p>
      </div>
    </div>
  `,
  styles: `
    .banner {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 32px 48px;
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

    .motto {
      grid-column: 1 / -1;
      padding: 28px 4px 8px;
      border-top: 1px solid var(--mc-dark-line);
    }

    .banner .motto p {
      margin: 10px 0 0;
      color: var(--mc-dark-text);
      font-size: 18px;
      font-style: italic;
      line-height: 1.6;
    }

    .banner .motto b {
      color: var(--mc-accent-bright);
    }

    .spice code {
      padding: 2px 8px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 6px;
      background: rgba(var(--mc-accent-rgb), 0.12);
      color: var(--mc-accent-bright);
      font-family: var(--mc-font-mono);
      font-size: 15px;
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
