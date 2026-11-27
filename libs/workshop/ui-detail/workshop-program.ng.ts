import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Agenda } from '@marmicode/training/core';
import { WorkshopLanguage } from '@marmicode/workshop/core';

/**
 * Agenda as a timeline; first 8 items, then a native `<details>` "Show the full program".
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-program',
  template: `WorkshopProgram - 🚧 work in progress`,
})
export class WorkshopProgram {
  agenda = input.required<Agenda>();
  language = input.required<WorkshopLanguage>();
}
