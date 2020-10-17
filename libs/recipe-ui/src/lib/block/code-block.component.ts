import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgModule,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CodeBlock } from '@marmicode/recipe-core';
import { RxState } from '@rx-angular/state';
import * as Prism from 'prismjs';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CodePipeModule } from './code.pipe';

import 'prismjs/plugins/line-numbers/prism-line-numbers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-code-block',
  providers: [RxState],
  template: ` <pre
    [ngClass]="languageClass$ | async"
    [class.line-numbers]="withLineNumbers"
    class="preformatted"
  ><code
    #code
    class="code"
    data-role="code-block">{{code$ | async}}</code></pre>`,
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements AfterViewChecked {
  @Input() set block(block: CodeBlock) {
    this._state.set({ block });
  }

  @ViewChild('code', { static: true }) codeEl: ElementRef<HTMLElement>;

  languageClass$ = this._state.select(
    map(({ block }) => (block ? `language-${block.language}` : null))
  );
  code$ = this._state.select(map(({ block }) => block?.code));
  withLineNumbers = true;

  private _viewChecked$ = new Subject();

  constructor(private _state: RxState<{ block: CodeBlock }>) {
    this._state.hold(
      /* Wait for view check. */
      this.code$.pipe(switchMap(() => this._viewChecked$)),
      /* @hack use `Prism.highlightElement` instead of a pipe with
       * `Prism.highlight` because it doesn't add line numbers. */
      () => Prism.highlightElement(this.codeEl.nativeElement)
    );
  }

  ngAfterViewChecked() {
    this._viewChecked$.next();
  }
}

@NgModule({
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
  imports: [CommonModule, CodePipeModule],
})
export class CodeBlockModule {}
