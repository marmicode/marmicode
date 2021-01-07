import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MarkdownBlock } from '@marmicode/frame-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-block',
  template: `🚧 markdown-block`,
})
export class MarkdownBlockComponent {
  block: MarkdownBlock;
}

@NgModule({
  declarations: [MarkdownBlockComponent],
  exports: [MarkdownBlockComponent],
  imports: [CommonModule],
})
export class MarkdownBlockModule {}
