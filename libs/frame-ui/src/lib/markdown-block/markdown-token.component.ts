import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Token } from 'marked';
import { MarkdownTokenListModule } from './markdown-token-list.component';

export enum TokenType {
  List = 'list',
  Paragraph = 'paragraph',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token',
  template: `
    <ng-container [ngSwitch]="token.type">
      <!-- Item list. -->
      <mc-markdown-list
        *ngSwitchCase="TokenType.List"
        [token]="token"
      ></mc-markdown-list>

      <!-- Paragraph. -->
      <p *ngSwitchCase="TokenType.Paragraph">{{ token.text }}</p>

      <div *ngSwitchDefault>{{ token.type }}</div>
    </ng-container>
  `,
})
export class MarkdownTokenComponent {
  @Input() token: Token;

  TokenType = TokenType;
}

@NgModule({
  declarations: [MarkdownTokenComponent],
  exports: [MarkdownTokenComponent],
  imports: [CommonModule, MarkdownTokenListModule],
})
export class MarkdownTokenModule {}
