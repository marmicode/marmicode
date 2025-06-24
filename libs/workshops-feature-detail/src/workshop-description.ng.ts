import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { BlockGroupComponent } from '@marmicode/block-ui';
import { WorkshopSection } from './workshop-section.ng';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { markdownToFrameBlockGroups } from '../../blog-post-ui/src/lib/markdown-to-frame-block-groups';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-description',
  imports: [BlockGroupComponent, WorkshopSection],
  template: `
    <mc-workshop-section color="surface">
      <mc-block-group [blockGroup]="blockGroup()" class="content" />
    </mc-workshop-section>
  `,
  styles: `
    .content {
      max-width: 1000px;
      margin: 0 auto;
    }
  `,
})
export class WorkshopDescription {
  description = input.required<string>();

  protected blockGroup = computed(
    () => markdownToFrameBlockGroups(this.description())[0],
  );
}
