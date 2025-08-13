import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-fixed-background',
  template: `
    <div
      [style.backgroundImage]="backgroundImage()"
      class="bg-fixed banner-image"
    ></div>

    <div class="bg-fixed banner-gradient"></div>
  `,
  styles: `
    .banner-image {
      background-color: var(--marmicode-primary-color);
    }

    .banner-gradient {
      background-image: linear-gradient(
        to bottom,
        rgba(10, 10, 10, 0.2),
        rgba(10, 10, 10, 0.8)
      );
    }

    .bg-fixed {
      position: absolute;
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
      inset: 0;
    }

    /* HACK: background-attachment: fixed does not work on iOS.
     * Handling this in JS causes flicker due to SSR then hydration
     * hitting and updating the CSS. 
     * This is the quick and dirty way of handling this distinction
     * in plain CSS. */
    @supports (-webkit-touch-callout: none) {
      .bg-fixed {
        background-attachment: scroll;
      }
    }
  `,
})
export class FixedBackground {
  pictureUri = input.required<string>();

  protected backgroundImage = computed(() => `url(${this.pictureUri()})`);
}
