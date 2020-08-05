import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-title',
  template: `<h1>{{ title }}</h1>`,
  styles: [
    `
      :host {
        background-color: #561f4b;
        color: white;
        text-align: center;
      }
    `,
  ],
})
export class RecipeTitleComponent {
  @Input() title: string;
}

@NgModule({
  declarations: [RecipeTitleComponent],
  exports: [RecipeTitleComponent],
  imports: [CommonModule],
})
export class RecipeTitleModule {}
