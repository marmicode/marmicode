import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TrainingAction, TrainingCallToAction } from '@marmicode/training/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';
import { UPCOMING_SESSIONS_SECTION_ID } from './workshop-sessions.ng';

/**
 * The closing band of a workshop's page:
 * it invites to join the waitlist, or to book a seat when sessions are scheduled.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-call-to-action',
  imports: [TrainingAction, TrainingCallToAction],
  template: `
    <mc-training-call-to-action [training]="workshop()">
      @if (!workshop().waitlist) {
        <mc-training-action
          slot="actions"
          icon="calendar_month"
          [fragment]="upcomingSessionsSectionId"
          [label]="labels().bookASession"
        />
      }
    </mc-training-call-to-action>
  `,
})
export class WorkshopCallToAction {
  workshop = input.required<Workshop>();

  protected labels = computed(
    () => WORKSHOP_DETAIL_LABELS[this.workshop().language],
  );
  protected upcomingSessionsSectionId = UPCOMING_SESSIONS_SECTION_ID;
}
