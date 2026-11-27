import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageSection } from '@marmicode/shared/ui';
import { Training } from '@marmicode/training/core';
import { TRAINING_LABELS } from './training.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-faq',
  imports: [MatExpansionModule, PageSection],
  template: `
    @if (training().faqs.length > 0) {
      <mc-page-section [sectionTitle]="sectionTitle()">
        <mat-accordion>
          @for (faq of training().faqs; track faq.question) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title> {{ faq.question }} </mat-panel-title>
              </mat-expansion-panel-header>
              <p>{{ faq.answer }}</p>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </mc-page-section>
    }
  `,
  styles: `
    mat-accordion {
      display: block;
      margin: auto;
      max-width: 800px;
    }
  `,
})
export class TrainingFaq {
  training = input.required<Training>();

  sectionTitle = computed(
    () => `🙋 ${TRAINING_LABELS[this.training().language].faq}`,
  );
}
