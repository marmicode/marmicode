import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WorkshopTestimonialCard } from './workshop-testimonial-card.ng';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-testimonials',
  imports: [WorkshopTestimonialCard, PageSection],
  template: `
    @if (testimonials().length > 0) {
      <mc-page-section [sectionTitle]="sectionTitle()" color="surface">
        <div class="testimonials">
          @for (testimonial of testimonials(); track testimonial.authorName) {
            <mc-workshop-testimonial-card [testimonial]="testimonial" />
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
export class WorkshopTestimonials {
  workshop = input.required<Workshop>();
  testimonials = computed(() => this.workshop().testimonials ?? []);
  sectionTitle = computed(
    () => `💬 ${WORKSHOP_DETAIL_LABELS[this.workshop().language].testimonials}`,
  );
}
