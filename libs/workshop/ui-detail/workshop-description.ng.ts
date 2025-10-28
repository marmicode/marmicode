import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownBlockComponent } from '@marmicode/block/ui';
import { PageSection } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-description',
  imports: [PageSection, MarkdownBlockComponent],
  template: `
    <mc-page-section color="surface">
      <mc-markdown-block [block]="description()" class="content" />
      <mc-markdown-block [block]="frenchMention" class="content" />
    </mc-page-section>
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
  frenchMention = `
  ---
  *🇫🇷 Formation également disponible en Français et éligible au financement OPCO.*
  `;
}
