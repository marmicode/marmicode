import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import {
  cohortRouterHelper,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { Badge, Button } from '@marmicode/shared/ui';

/**
 * Dark hero: cohort chip, "Trust, baked in.", pitch, and the
 * **Explore training** / **Browse the library** buttons.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-home-hero',
  imports: [Badge, Button, RouterLink],
  template: `
    <a class="chip" [routerLink]="cohortRouterHelper.detail(cohort.id)">
      <mc-badge variant="highlight">New</mc-badge>
      {{ cohort.shortTitle }} · {{ cohortWeekCount }}-week cohort, enrolling now
      →
    </a>
    <h1>Trust, <span class="mc-gradient-text">baked in.</span></h1>
    <p>
      Training, coaching and recipes for teams who want to ship with confidence,
      even with agents writing the code.
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
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      z-index: 1;
      /* With the app's offset for the floating nav, the content starts ~176px from the top. */
      padding: 96px 0 64px;
      text-align: center;
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
      max-width: 14ch;
      margin: 26px auto 22px;
      font-size: clamp(46px, 8vw, 96px);
      font-weight: 700;
      letter-spacing: -0.045em;
      line-height: 0.98;
    }

    p {
      max-width: 54ch;
      margin: 0 auto 36px;
      color: var(--mc-dark-muted);
      font-size: clamp(17px, 2vw, 20px);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
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
  `,
})
export class HomeHero {
  protected readonly cohort = FROM_DRIFT_TO_TRUST_FOR_ANGULAR;
  protected readonly cohortWeekCount =
    FROM_DRIFT_TO_TRUST_FOR_ANGULAR.schedule.weeks.length;
  protected readonly cohortRouterHelper = cohortRouterHelper;
  protected readonly resourceSearchRouterHelper = resourceSearchRouterHelper;
  protected readonly workshopRouterHelper = workshopRouterHelper;
}
