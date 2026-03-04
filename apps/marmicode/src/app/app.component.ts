import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from './footer.ng';
import { NavModule } from './nav.component';

@Component({
  selector: 'mc-root',
  imports: [Footer, NavModule, RouterModule],
  template: `
    <mc-nav>
      <router-outlet />
      <mc-footer />
    </mc-nav>
  `,
  styles: `
    :host {
      display: block;
      font-family: sans-serif;
      height: 100%;
    }
  `,
})
export class AppComponent {}
