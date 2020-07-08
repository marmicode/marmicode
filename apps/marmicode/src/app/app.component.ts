import { Component } from '@angular/core';

@Component({
  selector: 'mc-root',
  template: ` <router-outlet></router-outlet>`,
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
