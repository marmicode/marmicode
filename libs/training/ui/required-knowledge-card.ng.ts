import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TrainingLanguage } from '@marmicode/training/core';

/**
 * "// required knowledge" card with a checklist.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-required-knowledge-card',
  template: `RequiredKnowledgeCard - 🚧 work in progress`,
})
export class RequiredKnowledgeCard {
  skills = input.required<string[]>();
  language = input.required<TrainingLanguage>();
}
