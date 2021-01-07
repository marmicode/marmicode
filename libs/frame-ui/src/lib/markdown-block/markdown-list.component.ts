import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-list',
  template: `🚧 markdown-list`
})
export class MarkdownListComponent {}

@NgModule({
  declarations: [MarkdownListComponent],
  exports: [MarkdownListComponent],
  imports: [CommonModule]
})
export class MarkdownListModule {}
