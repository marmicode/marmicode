import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { PageSection } from '@marmicode/shared/ui';
import { Training } from '@marmicode/training/core';
import { TrainingBenefitCard } from './training-benefit-card.ng';
import { TRAINING_LABELS } from './training.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-benefits',
  imports: [TrainingBenefitCard, PageSection],
  template: `
    <mc-page-section [sectionTitle]="sectionTitle()" color="surface">
      <div class="benefits">
        @for (benefit of training().benefits; track benefit) {
          <mc-training-benefit-card [benefit]="benefit" />
        }
      </div>
    </mc-page-section>
  `,
  styles: `
    .benefits {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }
  `,
})
export class TrainingBenefits {
  training = input.required<Training>();
  sectionTitle = computed(
    () => `🍱 ${TRAINING_LABELS[this.training().language].whatYouWillLearn}`,
  );
}
