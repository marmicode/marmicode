import { Component } from '@angular/core';

@Component({
  selector: 'mc-root',
  template: ` <router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        display: block;
        font-family: sans-serif;
        min-width: 300px;
        max-width: 600px;
        margin: 50px auto;
      }
    `,
  ],
})
export class AppComponent {}
