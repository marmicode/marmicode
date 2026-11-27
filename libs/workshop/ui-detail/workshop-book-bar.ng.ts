import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@marmicode/shared/ui';
import { formatPrice } from '@marmicode/training/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

/**
 * Slim sticky bar at the bottom: short title, price, **Book a seat** → #sessions.
 * While not `visible`, it slides out of the viewport and is hidden from everyone (`visibility: hidden`).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-book-bar',
  imports: [Button, RouterLink],
  host: {
    '[class.visible]': 'visible()',
  },
  template: `
    @let labels = this.labels();

    <div class="title">
      <b>{{ workshop().shortTitle }}</b>
      <small>
        {{ details() }}
        @if (originalPrice(); as originalPrice) {
          <s>{{ originalPrice }}</s>
        }
      </small>
    </div>
    <a mcButton [routerLink]="[]" fragment="sessions">
      {{ labels.bookASession }}
    </a>
  `,
  styles: `
    :host {
      position: fixed;
      left: 50%;
      bottom: 16px;
      z-index: 25;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 14px;
      width: min(760px, 100% - 24px);
      padding: 8px 8px 8px 18px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.35);
      border-radius: 18px;
      background: rgba(26, 17, 32, 0.88);
      backdrop-filter: blur(16px) saturate(150%);
      -webkit-backdrop-filter: blur(16px) saturate(150%);
      box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.75);
      color: var(--mc-dark-text);
      font-family: var(--mc-font-sans);
      transform: translate(-50%, 140%);
      visibility: hidden;
      transition:
        transform 0.35s ease,
        visibility 0.35s;
    }

    :host(.visible) {
      transform: translate(-50%, 0);
      visibility: visible;
    }

    .title {
      min-width: 0;
      margin-right: auto;
    }

    b {
      display: block;
      overflow: hidden;
      font-size: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      color: var(--mc-dark-muted);
      font-size: 13px;
    }

    s {
      margin-left: 4px;
    }

    a {
      flex: none;
      padding: 11px 18px;
    }

    @media (max-width: 520px) {
      b {
        font-size: 14px;
      }

      a {
        padding: 10px 14px;
        font-size: 14px;
      }
    }
  `,
})
export class WorkshopBookBar {
  workshop = input.required<Workshop>();
  visible = input.required<boolean>();

  protected labels = computed(
    () => WORKSHOP_DETAIL_LABELS[this.workshop().language],
  );
  /* "3 days · Online · €1,270" */
  protected details = computed(() => {
    const { duration, language, offer } = this.workshop();
    const labels = this.labels();
    return [
      `${duration} ${duration === 1 ? labels.dayLowercase : labels.daysLowercase}`,
      labels.online,
      formatPrice({ price: offer.price, locale: language }),
    ].join(' · ');
  });
  protected originalPrice = computed(() => {
    const { language, offer } = this.workshop();
    return offer.type === 'early-bird'
      ? formatPrice({ price: offer.originalPrice, locale: language })
      : undefined;
  });
}
