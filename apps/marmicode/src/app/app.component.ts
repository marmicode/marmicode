import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavModule } from './nav.component';

@Component({
  selector: 'mc-root',
  imports: [NavModule, RouterModule],
  template: `
    <mc-nav>
      <router-outlet></router-outlet>
    </mc-nav>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: sans-serif;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent {}
