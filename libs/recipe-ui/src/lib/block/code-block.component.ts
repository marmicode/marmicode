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
import { RxState } from '@rx-angular/state';
import * as Prism from 'prismjs';
import { map } from 'rxjs/operators';
import { CodePipeModule } from './code.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-code-block',
  providers: [RxState],
  template: `<pre
    #code
    [ngClass]="languageClass$ | async"
    class="preformatted"
  ><code
    class="code"  
    data-role="code-block"></code></pre>`,
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements OnChanges {
  @Input() set block(block: CodeBlock) {
    this._state.set({ block });
  }

  @ViewChild('code', { static: true }) codeEl: ElementRef<HTMLElement>;

  languageClass$ = this._state.select(
    map(({ block }) => (block ? block.language : null))
  );

  constructor(private _state: RxState<{ block: CodeBlock }>) {}

  ngOnChanges() {
    // @todo use renderer.
    // @todo add line numbers.
    // @todo highlight lines.
    this.codeEl.nativeElement.classList.add(
      `language-${this._state.get().block.language}`
    );
    this.codeEl.nativeElement.textContent = this._state.get().block.code;
    /* @hack use `Prism.highlightElement` instead of a pipe with
     * `Prism.highlight` because it doesn't add line numbers. */
    Prism.highlightElement(this.codeEl.nativeElement);
  }
}

@NgModule({
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
  imports: [CommonModule, CodePipeModule],
})
export class CodeBlockModule {}
