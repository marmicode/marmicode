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
  template: `<pre class="language-javascript">
    <code [innerHTML]="block.code | code:{language: block.language}"></code>
  </pre>`,
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
