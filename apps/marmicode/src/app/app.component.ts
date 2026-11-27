import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WipService } from '@marmicode/shared/utils';
import { Footer } from './footer.ng';
import { NavModule } from './nav.component';
import { SiteFooter } from './site-footer.ng';
import { SiteNav } from './site-nav.ng';

@Component({
  selector: 'mc-root',
  imports: [Footer, NavModule, RouterModule, SiteFooter, SiteNav],
  template: `
    @if (isWip) {
      <mc-site-nav />
      <!-- Keeps the old light pages' first content below the floating nav. -->
      <div class="wip-content">
        <router-outlet />
      </div>
      <mc-site-footer />
    } @else {
      <mc-nav>
        <router-outlet />
        <mc-footer />
      </mc-nav>
    }
  `,
  styles: `
    :host {
      display: block;
      font-family: sans-serif;
      height: 100%;
    }

    .wip-content {
      /* position relative & z-index 0 prevent code or anything else from overlapping on the nav. */
      position: relative;
      z-index: 0;
      padding-top: 80px;
    }
  `,
})
export class AppComponent {
  protected isWip = inject(WipService).isWip();
}
