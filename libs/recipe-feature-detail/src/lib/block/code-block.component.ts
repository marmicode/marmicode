import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { CodeBlock } from './block';
import { CodePipeModule } from './code.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mc-code-block',
  template: `<pre
    class="language-javascript preformatted"
  ><code class="code" [innerHTML]="block.code | code:{language: block.language}"></code></pre>`,
  styles: [
    `
      :host .preformatted {
        font-size: 1.2em;
        height: 100%;
        border-radius: 10px;
        margin: 0.5em;
      }
    `,
  ],
  styleUrls: ['../../../../../node_modules/prismjs/themes/prism-tomorrow.css'],
})
export class CodeBlockComponent {
  @Input() block: CodeBlock;
}

@NgModule({
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
  imports: [CommonModule, CodePipeModule],
})
export class CodeBlockModule {}