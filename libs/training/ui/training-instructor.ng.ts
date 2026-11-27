import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CookCard, PageSection } from '@marmicode/shared/ui';
import { Training } from '@marmicode/training/core';
import { TRAINING_LABELS } from './training.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-instructor',
  imports: [PageSection, CookCard],
  template: `
    <mc-page-section [sectionTitle]="sectionTitle()" color="surface">
      <mc-cook-card />
    </mc-page-section>
  `,
})
export class TrainingInstructor {
  training = input.required<Training>();
  sectionTitle = computed(
    () => `👨🏻‍🏫 ${TRAINING_LABELS[this.training().language].instructor}`,
  );
}
