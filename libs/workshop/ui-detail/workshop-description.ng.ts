import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownBlockComponent } from '@marmicode/block/ui';
import { LandingSection } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-description',
  imports: [LandingSection, MarkdownBlockComponent],
  template: `
    <mc-landing-section color="surface">
      <mc-markdown-block [block]="description()" class="content" />
    </mc-landing-section>
  `,
  styles: `
    .content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  `,
})
export class WorkshopDescription {
  description = input.required<string>();
}
