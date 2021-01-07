import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  CodeBlock,
  createCodeBlock,
  MarkdownTokens,
} from '@marmicode/frame-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-code',
  styles: [
    `
      :host {
        font-size: 0.7em;
      }
    `,
  ],
  template: ` <mc-code-block [block]="codeBlock"></mc-code-block>`,
})
export class MarkdownCodeComponent implements OnChanges {
  @Input() token: MarkdownTokens.Code;
  codeBlock: CodeBlock;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.token) {
      this.codeBlock = createCodeBlock({
        code: this.token.text,
        language: this.token.lang,
      });
    }
  }
}
