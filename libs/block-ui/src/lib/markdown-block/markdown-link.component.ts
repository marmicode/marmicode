import { NgComponentOutlet, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownTokens } from '@marmicode/block-core';
import { select } from '@ngrx/store';
import { RxState } from '@rx-angular/state';
import { PushPipe } from '@rx-angular/template/push';
import { combineLatest } from 'rxjs';
import { HighlightLinkComponent } from '../highlight/highlight-link.component';
import { MarkdownBlockStateService } from './markdown-block-state.service';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  selector: 'mc-markdown-link',
  template: ` <mc-highlight-link
      *ngIf="isHighlightLink$ | push"
      [color]="color$ | push"
      [href]="href$ | push"
    >
      <ng-container
        *ngComponentOutlet="
          MarkdownTokensComponent();
          inputs: { tokens: tokens$ | push }
        "
      ></ng-container>
    </mc-highlight-link>
    <a
      *ngIf="(isHighlightLink$ | push) === false"
      [href]="href$ | push"
      target="_blank"
    >
      <ng-container
        *ngComponentOutlet="
          MarkdownTokensComponent();
          inputs: { tokens: tokens$ | push }
        "
      ></ng-container>
    </a>`,
  providers: [RxState],
  standalone: true,
  imports: [NgComponentOutlet, NgIf, HighlightLinkComponent, PushPipe],
})
export class MarkdownLinkComponent {
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

  constructor(
    private _markdownBlockStateService: MarkdownBlockStateService,
    private _state: RxState<{ token: MarkdownTokens.Link }>,
  ) {}
}
