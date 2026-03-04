import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CookCard, PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-instructor',
  imports: [PageSection, CookCard],
  template: `
    <mc-page-section [sectionTitle]="sectionTitle()" color="surface">
      <mc-cook-card />
    </mc-page-section>
  `,
})
export class WorkshopInstructor {
  workshop = input.required<Workshop>();
  sectionTitle = computed(
    () => `👨🏻‍🏫 ${WORKSHOP_DETAIL_LABELS[this.workshop().language].instructor}`,
  );
}
