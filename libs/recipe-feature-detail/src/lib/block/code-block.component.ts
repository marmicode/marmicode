import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
  Pipe,
  PipeTransform,
  ViewEncapsulation,
} from '@angular/core';
import { WipService } from '@marmicode/shared-utils';
import { CodeBlock } from './block';
import { CodePipeModule } from './code.pipe';

import * as hljs from 'highlight.js';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('yaml', yaml);

@Pipe({
  name: 'hljs',
})
export class HljsPipe implements PipeTransform {
  transform(code: string, { language }: { language: string }): string {
    return hljs.highlight(language, code).value;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mc-code-block',
  template: `<pre
      *ngIf="!isWip"
      [ngClass]="'language-' + block.language"
      class="preformatted"
    ><code class="code" [innerHTML]="block.code | code:{language: block.language}"></code></pre>
    <pre
      *ngIf="isWip"
      [ngClass]="'language-' + block.language"
      class="preformatted"
    ><code class="code" [innerHTML]="block.code | hljs:{language: block.language}"></code></pre>`,
  styles: [
    `
      :host {
        display: block;
      }

      /* @hack using more specific selector. */
      :host .preformatted {
        font-size: 1.2em;
        height: 100%;
        border-radius: 10px;
        margin: 0.5em;
      }
    `,
  ],
  styleUrls: [
    '../../../../../node_modules/prismjs/themes/prism-tomorrow.css',
    '../../../../../node_modules/highlight.js/styles/agate.css',
  ],
})
export class CodeBlockComponent {
  @Input() block: CodeBlock;

  isWip = this._wip.isWip();

  constructor(private _wip: WipService) {}
}

@NgModule({
  declarations: [CodeBlockComponent, HljsPipe],
  exports: [CodeBlockComponent],
  imports: [CommonModule, CodePipeModule],
})
export class CodeBlockModule {}
