import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { ResourceTopic } from '@marmicode/resource/core';

/**
 * Pill toggles from `RESOURCE_TOPICS` plus "All topics", with `aria-pressed`.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-topic-filter',
  template: `TopicFilter - 🚧 work in progress`,
})
export class TopicFilter {
  value = model.required<ResourceTopic | null>();
}
