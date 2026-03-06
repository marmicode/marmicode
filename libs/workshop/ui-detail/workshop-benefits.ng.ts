import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WorkshopBenefitCard } from './workshop-benefits-card.ng';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-benefits',
  imports: [WorkshopBenefitCard, PageSection],
  template: `
    <mc-page-section [sectionTitle]="sectionTitle()" color="surface">
      <div class="benefits">
        @for (benefit of workshop().benefits; track benefit) {
          <mc-workshop-benefit-card [benefit]="benefit" />
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
export class WorkshopBenefits {
  workshop = input.required<Workshop>();
  sectionTitle = computed(
    () =>
      `🍱 ${WORKSHOP_DETAIL_LABELS[this.workshop().language].whatYouWillLearn}`,
  );
}
