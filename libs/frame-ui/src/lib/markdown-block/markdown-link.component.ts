import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { select } from '@ngrx/store';
import { RxState } from '@rx-angular/state';
import { Tokens } from 'marked';
import { combineLatest } from 'rxjs';
import { HighlightLinkComponent } from '../highlight/highlight-link.component';
import { MarkdownBlockStateService } from './markdown-block-state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-link',
  template: ` <mc-highlight-link
      *ngIf="isHighlightLink$ | async"
      [color]="color$ | async"
      [href]="href$ | async"
      ><mc-markdown-tokens [tokens]="tokens$ | async"></mc-markdown-tokens
    ></mc-highlight-link>
    <a
      *ngIf="(isHighlightLink$ | async) === false"
      [href]="href$ | async"
      target="_blank"
    >
      <mc-markdown-tokens [tokens]="tokens$ | async"></mc-markdown-tokens>
    </a>`,
  providers: [RxState],
})
export class MarkdownLinkComponent {
  @Input() set token(token: Tokens.Link) {
    this._state.set({ token });
  }

  href$ = this._state.select('token', 'href');
  tokens$ = this._state.select('token', 'tokens');

  color$ = combineLatest([
    this._markdownBlockStateService.highlightableZones$,
    this.href$,
  ]).pipe(
    select(([highlightableZones, href]) =>
      HighlightLinkComponent.getColor({
        highlightableZones,
        href,
      })
    )
  );
  isHighlightLink$ = this.href$.pipe(
    select((href) => HighlightLinkComponent.canHandleLink(href))
  );

  constructor(
    private _markdownBlockStateService: MarkdownBlockStateService,
    private _state: RxState<{ token: Tokens.Link }>
  ) {}
}
