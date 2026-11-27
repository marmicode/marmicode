import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import {
  coachingRouterHelper,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { Badge } from '@marmicode/shared/ui';

/**
 * Three equal tiles in nav order: Library, Training (highlighted) and Coaching.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-home-tiles',
  imports: [Badge, NgTemplateOutlet, RouterLink],
  template: `
    <a
      class="tile mc-surface mc-surface-interactive"
      [routerLink]="resourceSearchRouterHelper.library()"
    >
      <div class="head">
        <div class="ico" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
      </div>
      <h3>The Library</h3>
      <p>Articles, videos and the free cookbooks.</p>
      <ul class="list">
        <li>Articles & videos<small>Testing, Angular, agentic dev…</small></li>
        <li>The Cookbook<small>Free</small></li>
      </ul>
      <span class="go"
        >Open the library <ng-container *ngTemplateOutlet="arrow"
      /></span>
    </a>

    <a
      class="tile mc-surface mc-surface-interactive mc-surface-highlighted"
      [routerLink]="workshopRouterHelper.list()"
    >
      <div class="head">
        <div class="ico" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
        <mc-badge class="tag" variant="highlight">Cohort enrolling</mc-badge>
      </div>
      <h3>Training</h3>
      <p>Hands-on, from testing to agentic dev.</p>
      <ul class="list">
        <li>
          {{ cohort.shortTitle }}
          <small class="hl">{{ cohortWeekCount }}-week cohort</small>
        </li>
        <li>
          Workshops<small
            >Public & in-house · Agentic Angular, Testing, Nx…</small
          >
        </li>
        <li>
          Video course<small>Pragmatic Angular Testing · from 120€</small>
        </li>
      </ul>
      <span class="go"
        >See all trainings <ng-container *ngTemplateOutlet="arrow"
      /></span>
    </a>

    <a
      class="tile t-coaching mc-surface mc-surface-interactive"
      [routerLink]="coachingRouterHelper.coaching()"
    >
      <div class="head">
        <div class="ico" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
            />
          </svg>
        </div>
      </div>
      <h3>Coaching</h3>
      <p>
        Stuck on architecture or testing strategy? Get a focused monthly
        partnership that charts a steadier path to predictable delivery. Keeping
        the bar high as agents write the code.
      </p>
      <span class="price">from €2 500 / month</span>
      <span class="go"
        >How it works <ng-container *ngTemplateOutlet="arrow"
      /></span>
    </a>

    <ng-template #arrow>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </ng-template>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 40px;
    }

    @media (max-width: 900px) {
      :host {
        grid-template-columns: 1fr;
      }
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

    .tile {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: hidden;
      padding: 28px;
      border-radius: 22px;
      color: var(--mc-dark-text);
      text-decoration: none;
    }

    .tile:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
    }

    .t-coaching {
      background:
        linear-gradient(
          160deg,
          rgba(var(--mc-accent-rgb), 0.14),
          transparent 60%
        ),
        var(--mc-dark-surface);
    }

    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ico {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.28);
      border-radius: 12px;
      background: rgba(var(--mc-accent-rgb), 0.12);
      color: var(--mc-accent-bright);
    }

    .tag {
      margin-left: auto;
    }

    h3 {
      margin: 0;
      font-size: 26px;
      font-weight: 600;
      letter-spacing: -0.025em;
    }

    p {
      margin: 0;
      color: var(--mc-dark-muted);
    }

    .list {
      display: grid;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .list li {
      padding: 11px 0;
      border-top: 1px solid var(--mc-dark-line);
      font-size: 15px;
    }

    .list small {
      display: block;
      margin-top: 2px;
      color: var(--mc-dark-muted);
      font-size: 12.5px;
    }

    .list small.hl,
    .price {
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
    }

    .list small.hl {
      font-size: 12px;
    }

    .price {
      font-size: 13px;
    }

    .go {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: auto;
      padding-top: 8px;
      font-size: 15px;
      font-weight: 600;
    }

    .tile:hover .go {
      color: var(--mc-accent-bright);
    }
  `,
})
export class HomeTiles {
  protected readonly cohort = FROM_DRIFT_TO_TRUST_FOR_ANGULAR;
  protected readonly cohortWeekCount =
    FROM_DRIFT_TO_TRUST_FOR_ANGULAR.schedule.weeks.length;
  protected readonly coachingRouterHelper = coachingRouterHelper;
  protected readonly resourceSearchRouterHelper = resourceSearchRouterHelper;
  protected readonly workshopRouterHelper = workshopRouterHelper;
}
