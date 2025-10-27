import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-page-section',
  template: `
    <section [class.surface]="color() === 'surface'">
      <h2>{{ pageTitle() }}</h2>
      <ng-content />
    </section>
  `,
  styles: `
    section {
      position: relative;
      width: 100%;
      padding-bottom: 5rem;
      display: block;
      background: var(--mc-section-background-color);
    }

    section.surface {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 10%,
        rgba(56, 0, 48, 0.1) 90%,
        rgba(56, 0, 48, 0.2) 110%
      );
    }

    section::before {
      position: absolute;
      height: 3rem;
      clip-path: ellipse(60% 100% at 50% 120%);
      background: var(--mc-section-ellipse-background-color);
      top: -3rem;
      width: 100%;
      content: '';
    }

    h2 {
      font-size: 1.75rem; /* ~28px */
      font-weight: 700;
      font-family: 'Inter', sans-serif; /* or your current font */
      color: #380030;
      text-transform: uppercase;
      text-align: center;
    }
  `,
  host: {
    '[style.--mc-section-background-color]': 'backgroundColors().section',
    '[style.--mc-section-ellipse-background-color]':
      'backgroundColors().ellipse',
  },
})
export class PageSection {
  pageTitle = input<string>();
  /**
   * The color of the section.
   * - 'surface' for a gradient background
   * - 'plain' for a white background
   * - 'grey' for a grey background (only used to match luma events background)
   */
  color = input<'surface' | 'plain' | 'grey'>('plain');

  protected backgroundColors = computed<{
    ellipse: string;
    section: string;
  }>(() => {
    switch (this.color()) {
      case 'surface':
        return {
          ellipse: 'white',
          section: `linear-gradient(
              180deg,
              rgba(255, 255, 255, 0) 10%,
              rgba(56, 0, 48, 0.1) 90%,
              rgba(56, 0, 48, 0.2) 110%
            )`,
        };
      case 'grey':
        return { ellipse: '#f7f8f9', section: '#f7f8f9' };
      default:
        return { ellipse: 'white', section: 'white' };
    }
  });
}
