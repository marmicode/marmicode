import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '@marmicode/shared/ui';
import { CoachingOffering } from '@marmicode/coaching/core';
import { COACHING_LABELS } from './coaching-presentation.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-hero',
  imports: [Hero, MatButtonModule, UpperCasePipe],
  template: `
    <mc-hero
      [pictureUri]="coaching().heroPictureUri"
      [title]="coaching().title"
    >
      <ng-content slot="content">
        <p class="badge">{{ coaching().priceLabel }}</p>
        <p class="subheading">{{ coaching().description }}</p>

        <div class="actions-container">
          <a [href]="coaching().bookCallUrl" matButton="filled" target="_blank">
            {{ labels().bookFitCall | uppercase }}
          </a>
        </div>
      </ng-content>
    </mc-hero>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      display: block;
      position: relative;

      @include mat.button-overrides(
        (
          filled-container-color: var(--marmicode-accent-bright-color),
          filled-label-text-color: black,
        )
      );
    }

    .eyebrow {
      font-size: 1.5em;
      font-weight: 600;
      line-height: 1;
      margin: 1rem 0 0.5rem;
      text-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
    }

    .headline {
      font-size: 3em;
      font-weight: bold;
      line-height: 1;
      margin: 0 0 1rem;
      text-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
    }

    .badge {
      padding: 0.5rem 1rem;
      margin: 1.5rem 0 0.7rem;
      border-radius: 20px;
      background: rgba(56, 0, 48, 0.6);
      font-size: 1.3em;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
    }

    .subheading {
      margin: 2rem 0;
      font-size: 1.5em;
      line-height: 1.5;
      max-width: 900px;
    }

    .actions-container {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;

      a {
        padding: 1.2rem;
        border-radius: 8px;
        font-size: 1em;
      }
    }
  `,
})
export class CoachingHero {
  coaching = input.required<CoachingOffering>();
  labels = () => COACHING_LABELS;
}
