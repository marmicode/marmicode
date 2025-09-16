import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import {
  CookCard,
  createBasicPageInfo,
  Hero,
  PageComponent,
  PageSection,
} from '@marmicode/shared/ui';
import heroPictureUri from './landing-hero.webp';
import { TheMenu } from './the-menu.ng';
import { UpcomingEvents } from './upcoming-events.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-landing-page',
  imports: [
    CookCard,
    Hero,
    MatButtonModule,
    MatIconModule,
    PageComponent,
    PageSection,
    RouterModule,
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
          <a
            [routerLink]="workshopRouterHelper.list()"
            mat-button
            class="hero-action"
            color="accent"
          >
            <mat-icon>school</mat-icon>

            LEVEL UP WITH A WORKSHOP
          </a>
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
    .subtitle {
      font-size: 1.5em;
      margin-bottom: 1.5rem;
    }

    .hero-action {
      font-size: 1.2em;
    }
  `,
})
export class LandingPage {
  landingBannerUri = heroPictureUri;
  workshopRouterHelper = workshopRouterHelper;
  pageInfo = createBasicPageInfo({
    title: 'Cook better apps with Marmicode',
    description:
      'Workshops, courses, and coaching to help you build better Angular apps. Learn from a Google Developer Expert and eXtreme Programming coach.',
  });
}
