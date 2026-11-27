import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { PageSection } from '@marmicode/shared/ui';
import { Training } from '@marmicode/training/core';
import { TrainingTestimonialCard } from './training-testimonial-card.ng';
import { TRAINING_LABELS } from './training.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-testimonials',
  imports: [TrainingTestimonialCard, PageSection],
  template: `
    @if (testimonials().length > 0) {
      <mc-page-section [sectionTitle]="sectionTitle()" color="surface">
        <div class="testimonials">
          @for (testimonial of testimonials(); track testimonial.authorName) {
            <mc-training-testimonial-card [testimonial]="testimonial" />
          }
        </div>
      </mc-page-section>
    }
  `,
  styles: `
    .testimonials {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      justify-content: center;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  `,
})
export class TrainingTestimonials {
  training = input.required<Training>();
  testimonials = computed(() => this.training().testimonials ?? []);
  sectionTitle = computed(
    () => `💬 ${TRAINING_LABELS[this.training().language].testimonials}`,
  );
}
