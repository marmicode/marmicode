import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeBlockModule } from '../code-block/code-block.component';
import { HighlightLinkModule } from '../highlight/highlight-link.component';
import { MarkdownCodeComponent } from './markdown-code.component';
import { MarkdownCodespanComponent } from './markdown-codespan.component';
import { MarkdownLinkComponent } from './markdown-link.component';
import { MarkdownListItemComponent } from './markdown-list-item.component';
import { MarkdownListComponent } from './markdown-list.component';
import { MarkdownParagraphComponent } from './markdown-paragraph.component';
import { MarkdownStrongComponent } from './markdown-strong.component';
import { MarkdownTextComponent } from './markdown-text.component';
import { MarkdownTokenComponent } from './markdown-token.component';
import { MarkdownTokensComponent } from './markdown-tokens.component';

/**
 * Using a module because most of these components are recursive.
 */
@NgModule({
  declarations: [
    MarkdownTokenComponent,
    MarkdownCodeComponent,
    MarkdownCodespanComponent,
    MarkdownLinkComponent,
    MarkdownListComponent,
    MarkdownListItemComponent,
    MarkdownParagraphComponent,
    MarkdownStrongComponent,
    MarkdownTextComponent,
    MarkdownTokensComponent,
  ],
  exports: [MarkdownTokensComponent],
  imports: [CommonModule, HighlightLinkModule, CodeBlockModule],
})
export class MarkdownModule {}
