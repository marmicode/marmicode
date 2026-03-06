import { NgComponentOutlet } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownTokens } from '@marmicode/block/core';
import { select } from '@ngrx/store';
import { RxState } from '@rx-angular/state';
import { PushPipe } from '@rx-angular/template/push';
import { combineLatest } from 'rxjs';
import { HighlightLinkComponent } from '../highlight/highlight-link.component';
import { MarkdownBlockStateService } from './markdown-block-state.service';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  selector: 'mc-markdown-link',
  template: ` @if (isHighlightLink$ | push) {
  <mc-highlight-link
    [color]="(color$ | push)!"
    [href]="href$ | push"
    >
    <ng-container
        *ngComponentOutlet="
          MarkdownTokensComponent() ?? null;
          inputs: { tokens: tokens$ | push }
        "
    ></ng-container>
  </mc-highlight-link>
}
@if ((isHighlightLink$ | push) === false) {
  <a
    [href]="href$ | push"
    target="_blank"
    >
    <ng-container
        *ngComponentOutlet="
          MarkdownTokensComponent() ?? null;
          inputs: { tokens: tokens$ | push }
        "
    ></ng-container>
  </a>
}`,
  providers: [RxState],
  imports: [NgComponentOutlet, HighlightLinkComponent, PushPipe],
})
export class MarkdownLinkComponent {
  private _markdownBlockStateService = inject(MarkdownBlockStateService);
  private _state = inject<RxState<{
    token: MarkdownTokens.Link;
}>>(RxState);

  @Input() set token(token: MarkdownTokens.Link) {
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
      }),
    ),
  );
  isHighlightLink$ = this.href$.pipe(
    select((href) => HighlightLinkComponent.canHandleLink(href)),
  );

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
