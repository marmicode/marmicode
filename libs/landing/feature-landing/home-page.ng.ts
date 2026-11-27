import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { HomeHero } from './home-hero.ng';
import { HomeTiles } from './home-tiles.ng';

/**
 * Dark home page: hero, tiles, upcoming events, the cook and the contact section.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-home-page',
  imports: [HomeHero, HomeTiles, PageComponent],
  template: `
    <mc-page [info]="pageInfo" theme="dark">
      <mc-home-hero class="wrap" />

      <section class="wrap tiles-section">
        <span class="mc-eyebrow">// what's cooking</span>
        <h2>Pick what you're hungry for.</h2>
        <mc-home-tiles />
      </section>
    </mc-page>
  `,
  styles: `
    .wrap {
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    section {
      padding: 72px 0;
    }

    .tiles-section {
      padding-top: 48px;
    }

    h2 {
      margin: 10px 0 0;
      font-size: clamp(30px, 4vw, 46px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }
  `,
})
export class HomePage {
  pageInfo = createBasicPageInfo({
    title: 'Cook better apps with Marmicode',
    description:
      'Workshops, courses, and coaching to help you build better Angular apps. Learn from a Google Developer Expert and eXtreme Programming coach.',
  });
}
