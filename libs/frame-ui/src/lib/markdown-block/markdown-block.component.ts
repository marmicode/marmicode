import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MarkdownBlock } from '@marmicode/frame-core';
import { MarkdownTokenModule } from './markdown-token.module';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-block',
  template: `<mc-markdown-tokens [tokens]="block.tokens"></mc-markdown-tokens>`,
})
export class MarkdownBlockComponent {
  @Input() block: MarkdownBlock;
}

@NgModule({
  declarations: [MarkdownBlockComponent],
  exports: [MarkdownBlockComponent],
  imports: [CommonModule, MarkdownTokenModule],
})
export class MarkdownBlockModule {}
