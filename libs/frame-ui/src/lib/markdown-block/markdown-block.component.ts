import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MarkdownBlock } from '@marmicode/frame-core';
import { HighlightZone } from '../highlight/highlight-zone';
import { MarkdownBlockStateService } from './markdown-block-state.service';
import { MarkdownModule } from './markdown.module';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-block',
  template: `<mc-markdown-tokens [tokens]="block.tokens"></mc-markdown-tokens>`,
  providers: [MarkdownBlockStateService],
})
export class MarkdownBlockComponent {
  @Input() block: MarkdownBlock;

  /**
   * The available zones to highlight.
   */
  @Input() set highlightableZones(highlightableZones: HighlightZone[]) {
    this._markdownBlockStateService.setHighlightableZones(highlightableZones);
  }

  constructor(private _markdownBlockStateService: MarkdownBlockStateService) {}
}

@NgModule({
  declarations: [MarkdownBlockComponent],
  exports: [MarkdownBlockComponent],
  imports: [CommonModule, MarkdownModule],
})
export class MarkdownBlockModule {}
