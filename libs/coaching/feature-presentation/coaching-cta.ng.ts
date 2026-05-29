import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CoachingOffering } from '@marmicode/coaching/core';
import { COACHING_LABELS } from './coaching-presentation.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-cta',
  imports: [MatButtonModule, UpperCasePipe],
  template: `
    <section class="cta">
      <h2>{{ coaching().ctaTitle }}</h2>
      <p class="description">{{ coaching().ctaDescription }}</p>
      <a [href]="coaching().bookCallUrl" matButton="filled" target="_blank">
        {{ COACHING_LABELS.bookFitCall | uppercase }}
      </a>
    </section>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      display: block;

      @include mat.button-overrides(
        (
          filled-container-color: var(--marmicode-accent-bright-color),
          filled-label-text-color: black,
        )
      );
    }

    .cta {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 5rem 2rem;
      background: var(--marmicode-primary-color);
      color: white;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
      margin: 0 0 1.5rem;
      max-width: 800px;
    }

    .description {
      font-size: 1.2em;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 0 2rem;
    }

    a {
      padding: 1.2rem;
      border-radius: 8px;
      font-size: 1em;
    }
  `,
})
export class CoachingCta {
  coaching = input.required<CoachingOffering>();
  COACHING_LABELS = COACHING_LABELS;
}
