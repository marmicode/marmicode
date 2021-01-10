import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownTokens } from '@marmicode/block-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-image',
  template: `<img [src]="token.href" [alt]="token.text" class="image" />`,
  styles: [
    `
      :host {
        display: block;
        text-align: center;
      }

      .image {
        max-width: 100%;
      }
    `,
  ],
})
export class MarkdownImageComponent {
  @Input() token: MarkdownTokens.Image;
}
