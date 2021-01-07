import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightLinkModule } from '../highlight/highlight-link.component';
import { MarkdownTokenCodespanComponent } from './markdown-token-codespan.component';
import { MarkdownTokenLinkComponent } from './markdown-token-link.component';
import { MarkdownTokenListItemComponent } from './markdown-token-list-item.component';
import { MarkdownTokenListComponent } from './markdown-token-list.component';
import { MarkdownTokenTextComponent } from './markdown-token-text.component';
import { MarkdownTokenComponent } from './markdown-token.component';
import { MarkdownTokensComponent } from './markdown-tokens.component';

/**
 * Using a module because most of these components are recursive.
 */
@NgModule({
  declarations: [
    MarkdownTokenComponent,
    MarkdownTokenCodespanComponent,
    MarkdownTokenLinkComponent,
    MarkdownTokenListComponent,
    MarkdownTokenListItemComponent,
    MarkdownTokenTextComponent,
    MarkdownTokensComponent,
  ],
  exports: [MarkdownTokensComponent],
  imports: [CommonModule, HighlightLinkModule],
})
export class MarkdownTokenModule {}
