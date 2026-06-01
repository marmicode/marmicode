import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PageSection } from '@marmicode/shared/ui';
import { CoachingOffering } from '@marmicode/coaching/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-philosophy',
  imports: [PageSection],
  template: `
    <mc-page-section color="grey">
      <div class="content">
        <h2>{{ coaching().philosophyTitle }}</h2>
        @for (paragraph of paragraphs(); track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </mc-page-section>
  `,
  styles: `
    .content {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #380030;
      text-align: center;
      margin: 0 0 1.5rem;
      line-height: 1.4;
    }

    p {
      font-size: 1.1em;
      line-height: 1.7;
      color: #374151;
      margin: 0 0 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  `,
})
export class CoachingPhilosophy {
  coaching = input.required<CoachingOffering>();

  paragraphs = () => this.coaching().philosophyContent.split('\n\n');
}
