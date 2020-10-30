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
import { RxState, select } from '@rx-angular/state';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HighlightZone } from '../highlight/highlight-zone';

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
      data-role="code-highlight"
    ></div>

    <!-- Highlight highlightable zones' line numbers. -->
    <div
      *ngFor="let style of lineNumberHighlightStyles$ | async"
      [style.backgroundColor]="style.color"
      [style.top.px]="style.top"
      [style.height.px]="style.height"
      class="line-number-highlight"
    ></div>
  </div>`,
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements AfterViewChecked {
  @Input() set block(block: CodeBlock) {
    this._state.set({ block });
  }

  @Input() set highlightZone(highlightZone: HighlightZone) {
    this._state.set({ highlightZone });
  }

  @Input() set highlightableZones(highlightableZones: HighlightZone[]) {
    this._state.set({ highlightableZones });
  }

  @ViewChild('code', { static: true }) codeEl: ElementRef<HTMLElement>;

  code$: Observable<string>;
  languageClass$: Observable<string>;
  lineNumberHighlightStyles$ = this._state.select('highlightableZones').pipe(
    select(
      map((highlightableZones) => {
        if (highlightableZones == null) {
          return [];
        }

        return highlightableZones
          .map((zone) => this._getHighlightStyles(zone))
          .reduce((acc, styles) => [...acc, ...styles], []);
      })
    )
  );
  highlightStyles$ = this._state.select('highlightZone').pipe(
    select(
      map((highlightZone) => {
        if (highlightZone == null) {
          return [];
        }
        return this._getHighlightStyles(highlightZone);
      })
    )
  );

  private _block$ = this._state.select('block');

  private _viewChecked$ = new Subject();
  constructor(
    private _state: RxState<{
      block: CodeBlock;
      highlightZone: HighlightZone;
      highlightableZones: HighlightZone[];
    }>
  ) {
    this.code$ = this._block$.pipe(select('code'));
    this.languageClass$ = this._block$.pipe(
      select(map((block) => (block ? `language-${block.language}` : null)))
    );

    /* Highlight element when code changes. */
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

  private _getHighlightStyles(highlightZone: HighlightZone) {
    const { color, sections } = highlightZone;

    const offset = 18;
    const lineHeight = 28;
    return sections.map((section) => ({
      color,
      top: offset + (section.start - 1) * lineHeight,
      height: (section.end - section.start + 1) * lineHeight,
    }));
  }
}

@NgModule({
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
  imports: [CommonModule],
})
export class CodeBlockModule {}
