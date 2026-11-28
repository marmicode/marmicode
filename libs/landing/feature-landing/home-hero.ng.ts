import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import {
  cohortRouterHelper,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { Badge, Button, cookPicture } from '@marmicode/shared/ui';

/**
 * Dark hero: cohort chip, "Trust, baked in.", first-person pitch, and the
 * **Explore training** / **Browse the library** buttons.
 * Desktop: copy left, Younes's photo card right with a name tag.
 * Mobile: no photo card, a "by Younes Jaaidi" byline with a small avatar instead.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-home-hero',
  imports: [Badge, Button, RouterLink],
  template: `
    <div>
      <a class="chip" [routerLink]="cohortRouterHelper.detail(cohort.id)">
        <mc-badge variant="highlight">New</mc-badge>
        {{ cohort.shortTitle }} · {{ cohortWeekCount }}-week cohort, enrolling
        now →
      </a>
      <h1>Trust, <span class="baked">baked in.</span></h1>
      <p class="pitch">
        I help teams ship with confidence, even with agents writing the code,
        through training, coaching and free recipes.
      </p>
      <p class="byline">
        <img class="face" [src]="cookPicture.avatarUri" alt="" />
        <span>by <b>Younes Jaaidi</b> · Angular GDE · Nx Champion</span>
      </p>
      <div class="actions">
        <a mcButton [routerLink]="workshopRouterHelper.list()">
          Explore training
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
        <a mcButton="ghost" [routerLink]="resourceSearchRouterHelper.library()">
          Browse the library
        </a>
      </div>
    </div>

    <figure class="portrait">
      <img [src]="cookPicture.uri" [alt]="cookPicture.alt" />
      <figcaption class="name-tag">
        <b>Younes Jaaidi</b>
        <small>Software Cook · Angular GDE · Nx Champion</small>
      </figcaption>
    </figure>
  `,
  styles: `
    :host {
      /* Amber, like the fairy lights in the photo. */
      --mc-warm: #f6b26b;
      --mc-warm-rgb: 246, 178, 107;

      display: grid;
      position: relative;
      z-index: 1;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: center;
      gap: 56px;
      /* With the app's offset for the floating nav, the content starts ~152px from the top. */
      padding: 72px 0 48px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 14px 6px 6px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      color: var(--mc-dark-muted);
      font-size: 14px;
      text-decoration: none;
      transition:
        border-color 0.2s,
        color 0.2s;
    }

    .chip:hover {
      border-color: rgba(var(--mc-accent-rgb), 0.6);
      color: var(--mc-dark-text);
    }

    .chip:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    h1 {
      margin: 24px 0 20px;
      font-size: clamp(46px, 6.4vw, 84px);
      font-weight: 700;
      letter-spacing: -0.045em;
      line-height: 0.98;
    }

    .baked {
      background: linear-gradient(
        100deg,
        rgb(var(--mc-violet-rgb)) 0%,
        #d98bb0 45%,
        var(--mc-warm) 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .pitch {
      max-width: 46ch;
      margin: 0 0 32px;
      color: var(--mc-dark-muted);
      font-size: clamp(17px, 2vw, 20px);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    svg {
      flex: none;
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Byline: mobile only, where the photo card is hidden. */
    .byline {
      display: none;
      align-items: center;
      gap: 10px;
      margin: -16px 0 28px;
      color: var(--mc-dark-muted);
      font-size: 14px;
    }

    .byline b {
      color: var(--mc-dark-text);
      font-weight: 600;
    }

    .face {
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }

    /* Photo card: the whole kitchen, not a close-up. */
    .portrait {
      position: relative;
      margin: 0;
    }

    /* Amber glow behind the card. */
    .portrait::before {
      content: '';
      position: absolute;
      z-index: -1;
      inset: -18%;
      background: radial-gradient(
        closest-side,
        rgba(var(--mc-warm-rgb), 0.14),
        transparent
      );
      pointer-events: none;
    }

    .portrait img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 5 / 4;
      object-fit: cover;
      object-position: 50% 30%;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 20px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    }

    .name-tag {
      position: absolute;
      bottom: 16px;
      left: 16px;
      padding: 10px 16px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 14px;
      background: rgba(26, 17, 32, 0.82);
      backdrop-filter: blur(10px);
    }

    .name-tag b {
      display: block;
      color: var(--mc-dark-text);
      font-size: 15px;
      font-weight: 600;
    }

    .name-tag small {
      color: var(--mc-dark-muted);
      font-size: 13px;
    }

    @media (max-width: 860px) {
      :host {
        display: block;
      }

      .byline {
        display: flex;
      }

      .portrait {
        display: none;
      }
    }
  `,
})
export class HomeHero {
  protected readonly cookPicture = cookPicture;
  protected readonly cohort = FROM_DRIFT_TO_TRUST_FOR_ANGULAR;
  protected readonly cohortWeekCount =
    FROM_DRIFT_TO_TRUST_FOR_ANGULAR.schedule.weeks.length;
  protected readonly cohortRouterHelper = cohortRouterHelper;
  protected readonly resourceSearchRouterHelper = resourceSearchRouterHelper;
  protected readonly workshopRouterHelper = workshopRouterHelper;
}
