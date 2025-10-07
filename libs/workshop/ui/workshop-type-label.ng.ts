import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Workshop } from '@marmicode/workshop/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-type-label',
  template: `{{ type() }}`,
})
export class WorkshopTypeLabel {
  workshop = input.required<Workshop>();

  protected type = computed(() =>
    this.workshop().type === 'tapas' ? '🫒 Tapas Session' : '🍽️ Full Course',
  );
}
