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
import { bindCallback, EMPTY, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CodePipeModule } from './code.pipe';

import 'prismjs/plugins/line-numbers/prism-line-numbers';

export interface HighlightSection {
  start: number;
  end: number;
}

export interface HighlightZone {
  color: string;
  sections: HighlightSection[];
}

export interface HighlightInfo {
  zones: HighlightZone[];
}

export function createHighlightInfo(
  highlightInfo: HighlightInfo
): HighlightInfo {
  return highlightInfo;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-code-block',
  providers: [RxState],
  template: ` <pre
    [ngClass]="languageClass$ | async"
    class="line-numbers preformatted"
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
  @Input() set highlight(highlightInfo: HighlightInfo) {
    this._state.set({ highlightInfo });
  }

  @ViewChild('code', { static: true }) codeEl: ElementRef<HTMLElement>;

  languageClass$ = this._state.select(
    map(({ block }) => (block ? `language-${block.language}` : null))
  );
  code$ = this._state.select(map(({ block }) => block?.code));

  private _viewChecked$ = new Subject();

  constructor(
    private _state: RxState<{ block: CodeBlock; highlightInfo: HighlightInfo }>
  ) {
    this._state.hold(
      this.code$.pipe(
        /* Wait for view check. */
        switchMap(() => this._viewChecked$),
        /* @hack use `Prism.highlightElement` instead of an angular pipe with
         * `Prism.highlight` because it doesn't add line numbers. */
        switchMap(
          () =>
            new Observable((observer) => {
              Prism.highlightElement(this.codeEl.nativeElement, false, () => {
                observer.next();
                observer.complete();
              });
            })
        )
      )
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
