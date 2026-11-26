import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

/**
 * An action of a training's banner or call to action.
 *
 * It either opens `href` in a new tab, or scrolls to `fragment` on the current page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-action',
  imports: [MatButtonModule, MatIconModule, RouterLink, UpperCasePipe],
  template: `
    @if (href(); as href) {
      <a
        class="action"
        target="_blank"
        [class.secondary]="variant() === 'secondary'"
        [href]="href"
        [matButton]="appearance()"
      >
        <mat-icon>{{ icon() }}</mat-icon>
        {{ label() | uppercase }}
      </a>
    } @else {
      <a
        class="action"
        [class.secondary]="variant() === 'secondary'"
        [fragment]="fragment()"
        [matButton]="appearance()"
        [routerLink]="[]"
      >
        <mat-icon>{{ icon() }}</mat-icon>
        {{ label() | uppercase }}
      </a>
    }
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      display: flex;
      flex: 1 0 auto;

      @include mat.button-overrides(
        (
          filled-container-color: var(--marmicode-accent-bright-color),
          filled-label-text-color: black,
          text-label-text-color: var(--marmicode-accent-bright-color),
        )
      );
    }

    .action {
      flex: 1 0 auto;
      padding: 1.2rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;

      &.secondary {
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);
      }
    }
  `,
})
export class TrainingAction {
  icon = input.required<string>();
  label = input.required<string>();
  /**
   * Link opened in a new tab.
   */
  href = input<string>();
  /**
   * Id of the section to scroll to, when there is no `href`.
   */
  fragment = input<string>();
  variant = input<'primary' | 'secondary'>('primary');

  protected appearance = computed(() =>
    this.variant() === 'primary' ? 'filled' : 'text',
  );
}
