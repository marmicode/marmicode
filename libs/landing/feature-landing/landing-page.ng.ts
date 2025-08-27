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
        [pictureUri]="
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
        "
        contentPosition="middle"
        size="half-height"
        title="Turn Code Into Cuisine"
      >
        <ng-content slot="content">
          <h2>
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
  styles: [
    `
      .about-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2.5rem;
        max-width: 900px;
        margin: 0 auto;
      }

      .about-img {
        width: 240px;
        height: 240px;
        object-fit: cover;
        border-radius: 16px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }

      .about-text {
        flex: 1;
        text-align: left;
      }

      .about-text h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #561f4b;
      }

      .about-text p {
        font-size: 1.1rem;
        margin-bottom: 1.2rem;
        color: #2d1a13;
      }

      .about-cta {
        font-size: 1rem;
        color: #5db3ad;
        font-weight: 600;
      }

      .about-cta mat-icon {
        vertical-align: middle;
        margin-left: 0.2rem;
      }

      @media (max-width: 1100px) {
        .about-content {
          flex-direction: column;
          gap: 1.5rem;
        }
      }
    `,
  ],
})
export class LandingPage {
  pageInfo = createBasicPageInfo({
    title: 'Cook better apps with Marmicode',
    description:
      'Workshops, courses, and coaching to help you build better Angular apps. Learn from a Google Developer Expert and eXtreme Programming coach.',
  });
}
