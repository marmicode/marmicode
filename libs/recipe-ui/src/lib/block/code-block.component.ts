import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CodeBlock } from '@marmicode/recipe-core';
import * as Prism from 'prismjs';
import { CodePipeModule } from './code.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-code-block',
  template: `<pre #code class="preformatted"><code
    class="code"  
    data-role="code-block"></code></pre>`,
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements OnChanges {
  @Input() block: CodeBlock;

  @ViewChild('code', { static: true }) codeEl: ElementRef<HTMLElement>;

  ngOnChanges() {
    // @todo use renderer.
    // @todo add line numbers.
    // @todo highlight lines.
    this.codeEl.nativeElement.classList.add(`language-${this.block.language}`);
    this.codeEl.nativeElement.textContent = this.block.code;
    Prism.highlightElement(this.codeEl.nativeElement);
  }
}

@NgModule({
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
  imports: [CommonModule, CodePipeModule],
})
export class CodeBlockModule {}
