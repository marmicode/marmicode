import { Component } from '@angular/core';

@Component({
  selector: 'mc-root',
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
      }
    `,
  ],
})
export class AppComponent {}
