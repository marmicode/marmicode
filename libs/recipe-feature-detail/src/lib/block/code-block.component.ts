import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { WipService } from '@marmicode/shared-utils';
import { CodeBlock } from './block';
import { CodePipeModule } from './code.pipe';

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
      class="preformatted"
    ><code class="code" [innerHTML]="block.code"></code></pre>`,
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
  styleUrls: ['../../../../../node_modules/prismjs/themes/prism-tomorrow.css'],
})
export class CodeBlockComponent {
  @Input() block: CodeBlock;

  isWip = this._wip.isWip();

  constructor(private _wip: WipService) {}
}

@NgModule({
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
  imports: [CommonModule, CodePipeModule],
})
export class CodeBlockModule {}
