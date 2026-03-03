import { CommonModule, NgClass } from '@angular/common';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  NgModule,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CodeBlock } from '@marmicode/block/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { HighlightZone } from '../highlight/highlight-zone';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-code-block',
  host: {
    /* This component manupilates the DOM imperatively with Prism.js, so we need to skip hydration.
     * This will destroy the DOM and recreate it on the client. */
    ngSkipHydration: 'true',
    /* @hack prevent touchstart from propagating to parent in order
     * to allow code horizontal scroll in favor of swipe. */
    '(touchstart)': '$event.stopPropagation()',
  },
  template: ` <div class="code-container">
    <pre
      [ngClass]="languageClass()"
      [style.paddingTop.px]="verticalPadding"
      [style.paddingBottom.px]="verticalPadding"
      class="line-numbers preformatted"
    >@for (style of lineNumberHighlightStyles(); track style.top) {<div
      [style.backgroundColor]="style.color"
      [style.top.px]="style.top"
      [style.height.px]="style.height"
      class="line-number-highlight"
    ></div>}<code #codeEl class="code" data-role="code-block">{{ code() }}</code></pre>

    <!-- Highlights. -->
    @for (style of highlightStyles(); track style.top) {
      <div
        [style.backgroundColor]="style.color"
        [style.top.px]="style.top"
        [style.height.px]="style.height"
        class="highlight"
        data-role="code-highlight"
      ></div>
    }
  </div>`,
  styleUrl: './code-block.component.scss',
  imports: [NgClass],
})
export class CodeBlockComponent {
  block = input.required<CodeBlock>();
  highlightZone = input<HighlightZone>();
  highlightableZones = input<HighlightZone[]>();

  onClick($event: MouseEvent) {
    console.log('onClick', $event);
  }

  protected code = computed(() => this.block().code);
  protected languageClass = computed(
    () => `language-${this.block().language}` as const,
  );

  private _codeEl = viewChild.required<ElementRef<HTMLElement>>('codeEl');
  /** Default to 25 on SSR as we can't query DOM. */
  private _lineHeight = signal(25);
  private _lastProcessedCode: string | null = null;

  readonly lineNumberHighlightStyles = computed(() => {
    const highlightableZones = this.highlightableZones();
    const lineHeight = this._lineHeight();
    if (highlightableZones == null) {
      return [];
    }
    return highlightableZones
      .map((zone) => this._getHighlightStyles({ lineHeight, zone }))
      .reduce((acc, styles) => [...acc, ...styles], []);
  });

  readonly highlightStyles = computed(() => {
    const highlightZone = this.highlightZone();
    const lineHeight = this._lineHeight();
    if (highlightZone == null) {
      return [];
    }
    return this._getHighlightStyles({
      zone: highlightZone,
      lineHeight,
    });
  });

  readonly verticalPadding = 10;

  constructor() {
    afterRenderEffect({
      write: () => {
        const block = this.block();
        if (this._lastProcessedCode !== block.code) {
          /* @hack use `Prism.highlightElement` instead of an angular pipe with
           * `Prism.highlight` because it doesn't add line numbers.
           * We are not using async highlight as it crashes for some reason...
           * ... maybe a web worker issue? */
          const nativeEl = this._codeEl().nativeElement;
          Prism.highlightElement(nativeEl);
          this._lastProcessedCode = block.code;
          this._lineHeight.set(
            nativeEl.querySelector('.line-numbers-rows span')?.clientHeight ??
              25,
          );
        }
      },
    });
  }

  private _getHighlightStyles({
    lineHeight,
    zone,
  }: {
    lineHeight: number;
    zone: HighlightZone;
  }): { color: string; top: number; height: number }[] {
    const { color, sections } = zone;
    const offset = this.verticalPadding;
    return sections.map((section) => ({
      color,
      top: offset + (section.start - 1) * lineHeight,
      height: (section.end - section.start + 1) * lineHeight,
    }));
  }
}

@NgModule({
  exports: [CodeBlockComponent],
  imports: [CommonModule, CodeBlockComponent],
})
export class CodeBlockModule {}
