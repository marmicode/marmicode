import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownBlockComponent } from '@marmicode/block-ui';
import { WorkshopSection } from './workshop-section.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-description',
  imports: [WorkshopSection, MarkdownBlockComponent],
  template: `
    <mc-workshop-section color="surface">
      <mc-markdown-block [block]="description()" class="content" />
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
}
