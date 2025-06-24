import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-fixed-background',
  template: `
    <div
      [class.bg-fixed]="supportsFixedBackground"
      [style.backgroundImage]="backgroundImage()"
      class="banner-image"
    ></div>

    <div
      [class.bg-fixed]="supportsFixedBackground"
      class="banner-gradient"
    ></div>
  `,
  styles: `
    .bg-fixed {
      background-attachment: fixed;
    }

    .banner-image {
      position: absolute;
      background-color: var(--marmicode-primary-color);
      background-position: center;
      background-size: cover;
      inset: 0;
    }

    .banner-gradient {
      position: absolute;
      background-position: center;
      background-size: cover;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(10, 10, 10, 0.5)
      );
      inset: 0;
    }
  `,
})
export class FixedBackground {
  pictureUri = input.required<string>();

  protected backgroundImage = computed(() => `url(${this.pictureUri()})`);
  protected supportsFixedBackground = !inject(Platform).IOS;
}
