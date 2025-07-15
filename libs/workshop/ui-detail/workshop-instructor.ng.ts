import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CookCard, PageSection } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-instructor',
  imports: [PageSection, CookCard],
  template: `
    <mc-page-section title="👨🏻‍🏫 Your Instructor" color="surface">
      <mc-cook-card />
    </mc-page-section>
  `,
})
export class WorkshopInstructor {}
