import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { TextBlock } from './block';
import { MarkdownPipeModule } from './markdown.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-text-block',
  template: `<div [innerHTML]="block.text | markdown"></div>`,
  encapsulation: ViewEncapsulation.ShadowDom,
  styles: [
    `
      :host {
        display: block;
        margin: 10px;

        color: #292929;
        font-family: Georgia, 'Times New Roman', Times, serif;
        font-size: 21px;
        font-weight: 400;
        line-height: 32px;
        text-rendering: optimizeLegibility;
        word-break: break-word;
        -webkit-font-smoothing: antialiased;
      }

      code {
        background-color: #eee;
        border-radius: 3px;
        padding: 0 2px;
      }
    `,
  ],
})
export class TextBlockComponent {
  @Input() block: TextBlock;
}

@NgModule({
  declarations: [TextBlockComponent],
  exports: [TextBlockComponent],
  imports: [CommonModule, MarkdownPipeModule],
})
export class TextBlockModule {}
