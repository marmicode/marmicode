import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownBlockComponent } from '@marmicode/block/ui';
import { PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-description',
  imports: [PageSection, MarkdownBlockComponent],
  template: `
    <mc-page-section color="surface">
      <mc-markdown-block [block]="workshop().description" class="content" />
    </mc-page-section>
  `,
  styles: `
    .content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 1rem 2rem 0 2rem;
    }
  `,
})
export class WorkshopDescription {
  workshop = input.required<Workshop>();
}
