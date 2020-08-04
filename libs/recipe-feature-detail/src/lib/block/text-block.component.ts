import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { TextBlock } from './block';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-text-block',
  template: `🚧 text-block`,
})
export class TextBlockComponent {
  @Input() block: TextBlock;
}

@NgModule({
  declarations: [TextBlockComponent],
  exports: [TextBlockComponent],
  imports: [CommonModule],
})
export class TextBlockModule {}
