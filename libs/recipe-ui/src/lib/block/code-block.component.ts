import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { CodeBlock } from '@marmicode/recipe-core';
import { CodePipeModule } from './code.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-code-block',
  template: `<pre
    [ngClass]="'language-' + block.language"
    class="preformatted"
  ><code [innerHTML]="block.code | code:{language: block.language}" class="code"  data-role="code-block"></code></pre>`,
  styleUrls: ['./code-block.component.scss'],
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
