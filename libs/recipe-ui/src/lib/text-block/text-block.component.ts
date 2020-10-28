import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { TextBlock } from '@marmicode/recipe-core';
import { MarkdownPipeModule } from './markdown.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-text-block',
  template: `<div [innerHTML]="block.text | markdown"></div>`,
  styleUrls: ['./text-block.component.scss'],
})
export class TextBlockComponent {
  @Input() block: TextBlock;

  static canHandleLink(href: string) {
    return false;
  }
}

@NgModule({
  declarations: [TextBlockComponent],
  exports: [TextBlockComponent],
  imports: [CommonModule, MarkdownPipeModule],
})
export class TextBlockModule {}
