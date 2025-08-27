import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FixedBackground } from './fixed-background.ng';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-hero',
  template: ` <mc-fixed-background [pictureUri]="pictureUri()" />
    <div
      class="content"
      [class.full-height]="isFullHeight()"
      [class.middle]="isContentMiddle()"
    >
      <h1 class="title">{{ title() }}</h1>
      <h2 class="subtitle">
        <ng-content select="[slot='subtitle']" />
      </h2>
      <ng-content select="[slot='content']" />

      @if (isFullHeight()) {
        <mat-icon class="down-arrow">keyboard_arrow_down</mat-icon>
      }
    </div>`,
  imports: [FixedBackground, MatIconModule],
  styles: `
    :host {
      position: relative;
    }

    .content {
      display: flex;
      position: relative;
      min-height: 50vh;
      padding-top: 2rem;

      flex-direction: column;
      align-items: center;
      justify-content: end;

      color: white;
      text-align: center;

      animation: fadeScaleIn 0.3s ease-out forwards;
    }

    .content.middle {
      justify-content: center;
    }

    .content.full-height {
      min-height: calc(100vh - 64px);
    }

    .title,
    .subtitle {
      font-weight: bold;
      line-height: 1;
      text-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
    }

    .title {
      font-size: 3em;
    }

    .subtitle {
      font-size: 1.5em;
    }

    .down-arrow {
      animation: bounce 2s infinite;
      margin: 0 0 3rem 0;
    }

    @keyframes fadeScaleIn {
      from {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
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
export class Hero {
  pictureUri = input.required<string>();
  title = input.required<string>();
  size = input<'full-height' | 'half-height'>('full-height');
  contentPosition = input<'middle' | 'bottom'>('bottom');

  isContentMiddle = computed(() => this.contentPosition() === 'middle');
  isFullHeight = computed(() => this.size() === 'full-height');
}
