import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MarkdownBlock } from '@marmicode/frame-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-block',
  template: `
    <ng-container *ngFor="let token of block.tokens" [ngSwitch]="token.type">
      <p *ngSwitchCase="tokenType.paragraph">{{ token.text }}</p>
      <div *ngSwitchDefault>{{ token.type }}</div>
    </ng-container>
  `,
})
export class MarkdownBlockComponent {
  @Input() block: MarkdownBlock;
  tokenType = {
    paragraph: 'paragraph',
  };
}

@NgModule({
  declarations: [MarkdownBlockComponent],
  exports: [MarkdownBlockComponent],
  imports: [CommonModule],
})
export class MarkdownBlockModule {}

// Tokens.Space
// | Tokens.Code
// | Tokens.Heading
// | Tokens.Table
// | Tokens.Hr
// | Tokens.Blockquote
// | Tokens.BlockquoteStart
// | Tokens.BlockquoteEnd
// | Tokens.List
// | Tokens.ListItem
// | Tokens.Paragraph
// | Tokens.HTML
// | Tokens.Text
// | Tokens.Def
// | Tokens.Escape
// | Tokens.Tag
// | Tokens.Image
// | Tokens.Link
// | Tokens.Strong
// | Tokens.Em
// | Tokens.Codespan
// | Tokens.Br
// | Tokens.Del;
