import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-text-block-link',
  template: `🚧 text-block-link`,
})
export class TextBlockLinkComponent {}

@NgModule({
  declarations: [TextBlockLinkComponent],
  exports: [TextBlockLinkComponent],
  imports: [CommonModule],
})
export class TextBlockLinkModule {}
