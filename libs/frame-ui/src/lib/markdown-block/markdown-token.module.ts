import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownTokenListItemComponent } from './markdown-token-list-item.component';
import { MarkdownTokenListComponent } from './markdown-token-list.component';
import { MarkdownTokenTextComponent } from './markdown-token-text.component';
import { MarkdownTokenComponent } from './markdown-token.component';

/**
 * Using a module because most of these components are recursive.
 */
@NgModule({
  declarations: [
    MarkdownTokenComponent,
    MarkdownTokenListComponent,
    MarkdownTokenListItemComponent,
    MarkdownTokenTextComponent,
  ],
  exports: [MarkdownTokenComponent],
  imports: [CommonModule],
})
export class MarkdownTokenModule {}
