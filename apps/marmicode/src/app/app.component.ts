import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteFooter } from './site-footer.ng';
import { SiteNav } from './site-nav.ng';

@Component({
  selector: 'mc-root',
  imports: [RouterModule, SiteFooter, SiteNav],
  template: `
    <mc-site-nav />
    <!-- Keeps the pages' first content below the floating nav. -->
    <div class="content">
      <router-outlet />
    </div>
    <mc-site-footer />
  `,
  styles: `
    :host {
      display: block;
      font-family: sans-serif;
      height: 100%;
    }

    .content {
      /* position relative & z-index 0 prevent code or anything else from overlapping on the nav. */
      position: relative;
      z-index: 0;
      padding-top: 80px;
      background-color: var(--mc-dark-bg);
    }
  `,
})
export class AppComponent {
  constructor() {
    /* Router anchor scrolling ignores CSS `scroll-margin-top`, so keep
     * anchors below the floating nav (and the workshop's sticky tabs). */
    inject(ViewportScroller).setOffset([0, 150]);
  }
}
