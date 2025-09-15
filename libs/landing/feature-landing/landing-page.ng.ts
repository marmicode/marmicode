import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CookCard,
  createBasicPageInfo,
  Hero,
  PageComponent,
  PageSection,
} from '@marmicode/shared/ui';
import { TheMenu } from './the-menu.ng';
import { UpcomingEvents } from './upcoming-events.ng';
import heroPictureUri from './landing-hero.webp';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-landing-page',
  imports: [
    PageComponent,
    Hero,
    PageSection,
    CookCard,
    TheMenu,
    UpcomingEvents,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <mc-hero
        [pictureUri]="landingBannerUri"
        contentPosition="middle"
        size="half-height"
        title="Let's Cook Better Apps!"
      >
        <ng-content slot="content">
          <h2 class="subtitle">
            Workshops, coaching, and recipes for devs who want to ship with
            confidence — and taste.
          </h2>
        </ng-content>
      </mc-hero>

      <mc-the-menu />

      <mc-upcoming-events />

      <mc-page-section pageTitle="👨🏻‍🍳 About the Cook" color="surface">
        <mc-cook-card />
      </mc-page-section>
    </mc-page>
  `,
  styles: `
    :host {
      font-size: 1rem;
    }
    
    .subtitle {
      font-size: 1.5em;
    }
  `,
})
export class LandingPage {
  landingBannerUri = heroPictureUri;
  pageInfo = createBasicPageInfo({
    title: 'Cook better apps with Marmicode',
    description:
      'Workshops, courses, and coaching to help you build better Angular apps. Learn from a Google Developer Expert and eXtreme Programming coach.',
  });
}
