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
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

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
  template: ` <div class="code-container">
    <pre
      [ngClass]="languageClass$ | async"
      class="line-numbers preformatted"
    ><code
      #code
      class="code"
      data-role="code-block">{{code$ | async}}</code></pre>

    <!-- Highlights. -->
    <div
      *ngFor="let style of highlightStyles$ | async"
      [style.backgroundColor]="style.color"
      [style.top.px]="style.top"
      [style.height.px]="style.height"
      class="highlight"
    ></div>
  </div>`,
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

  code$ = this._state.select(map(({ block }) => block?.code));
  languageClass$ = this._state.select(
    map(({ block }) => (block ? `language-${block.language}` : null))
  );
  highlightStyles$ = this._state.select(
    map(({ highlightInfo }) => {
      if (highlightInfo == null) {
        return [];
      }

      const offset = 18;
      const lineHeight = 28;
      return (
        highlightInfo.zones
          .map(({ color, sections }) =>
            sections.map((section) => ({
              color,
              top: offset + (section.start - 1) * lineHeight,
              height: (section.end - section.start + 1) * lineHeight,
            }))
          )
          /* Flatten list. */
          .reduce((acc, coords) => [...acc, ...coords], [])
      );
    })
  );

  private _viewChecked$ = new Subject();

  constructor(
    private _state: RxState<{ block: CodeBlock; highlightInfo: HighlightInfo }>
  ) {
    this._state.hold(
      this.code$.pipe(
        /* Wait for view check. */
        switchMap(() => this._viewChecked$),
        /* @hack use `Prism.highlightElement` instead of an angular pipe with
         * `Prism.highlight` because it doesn't add line numbers.
         * We are not using async highlight as it crashes for some reason...
         * ... maybe a web worker issue? */
        tap(() => Prism.highlightElement(this.codeEl.nativeElement))
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
  imports: [CommonModule],
})
export class CodeBlockModule {}