import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WipService } from '@marmicode/shared/utils';
import { Footer } from './footer.ng';
import { NavModule } from './nav.component';
import { SiteNav } from './site-nav.ng';

@Component({
  selector: 'mc-root',
  imports: [Footer, NavModule, RouterModule, SiteNav],
  template: `
    @if (isWip) {
      <mc-site-nav />
      <router-outlet />
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
  `,
})
export class AppComponent {
  protected isWip = inject(WipService).isWip();
}
