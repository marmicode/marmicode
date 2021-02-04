import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgModule,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CodeBlock } from '@marmicode/block-core';
import { RxState, select, selectSlice } from '@rx-angular/state';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { animationFrameScheduler, Observable, Subject } from 'rxjs';
import { map, observeOn, switchMap, tap } from 'rxjs/operators';
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
    ><div
      *ngFor="let style of lineNumberHighlightStyles$ | async"
      [style.backgroundColor]="style.color"
      [style.top.px]="style.top"
      [style.height.px]="style.height"
      class="line-number-highlight"
    ></div><code
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
  lineNumberHighlightStyles$ = this._state.select().pipe(
    selectSlice(['highlightableZones', 'lineHeight']),
    select(
      map(({ highlightableZones, lineHeight }) => {
        if (highlightableZones == null) {
          return [];
        }

        return highlightableZones
          .map((zone) => this._getHighlightStyles({ lineHeight, zone }))
          .reduce((acc, styles) => [...acc, ...styles], []);
      })
    )
  );
  highlightStyles$ = this._state.select().pipe(
    selectSlice(['highlightZone', 'lineHeight']),
    select(
      map(({ highlightZone, lineHeight }) => {
        if (highlightZone == null) {
          return [];
        }
        return this._getHighlightStyles({ zone: highlightZone, lineHeight });
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
      lineHeight: number;
    }>
  ) {
    this.code$ = this._block$.pipe(select('code'));
    this.languageClass$ = this._block$.pipe(
      select(map((block) => (block ? `language-${block.language}` : null)))
    );

    /* Highlight element when code changes. */
    this._state.connect(
      this.code$.pipe(
        /* Wait for view check. */
        switchMap(() => this._viewChecked$),
        /* @hack use `Prism.highlightElement` instead of an angular pipe with
         * `Prism.highlight` because it doesn't add line numbers.
         * We are not using async highlight as it crashes for some reason...
         * ... maybe a web worker issue? */
        tap(() => Prism.highlightElement(this.codeEl.nativeElement)),
        map(
          () =>
            this.codeEl.nativeElement.querySelector('.line-numbers-rows span')
              .clientHeight
        ),
        /* @hack schedule state change for next cycle otherwise
         * change detection will miss it...
         * except if we use @rx-angular/template's push. */
        observeOn(animationFrameScheduler),
        map((lineHeight) => ({ lineHeight }))
      )
    );
  }

  ngAfterViewChecked() {
    this._viewChecked$.next();
  }

  /* @hack prevent touchstart from propagating to parent in order
   * to allow code horizontal scroll in favor of swipe. */
  @HostListener('touchstart', ['$event']) onTouchstart(evt: TouchEvent) {
    evt.stopPropagation();
  }

  private _getHighlightStyles({
    lineHeight,
    zone,
  }: {
    lineHeight: number;
    zone: HighlightZone;
  }): { color: string; top: number; height: number }[] {
    const { color, sections } = zone;

    const offset = 20;
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
