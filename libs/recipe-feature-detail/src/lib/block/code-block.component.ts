import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { CodeBlock } from './block';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-code-block',
  template: `🚧 code-block`,
})
export class CodeBlockComponent {
  @Input() block: CodeBlock;
}

@NgModule({
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
  imports: [CommonModule],
})
export class CodeBlockModule {}
