import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  coachingRouterHelper,
  externalLinks,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { Card, Link, LinkComponent, PageSection } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-the-menu',
  imports: [PageSection, MatButtonModule, MatIconModule, LinkComponent, Card],
  template: `
    <mc-page-section sectionTitle="🍜 The Menu" color="plain">
      <div class="container">
        @for (product of products; track product.title) {
          <mc-card [icon]="product.icon" [link]="product.link">
            <ng-container slot="title">{{ product.title }}</ng-container>
            <ng-container slot="content">
              <p>{{ product.description }}</p>
              <div class="services">
                @for (service of product.services; track service) {
                  <li>
                    <mat-icon>{{ service.icon }}</mat-icon>
                    <mc-link [href]="service.href">
                      <span [class.clickable]="service.href">{{
                        service.text
                      }}</span>
                    </mc-link>
                    @if (service.offer) {
                      <span class="offer">{{ service.offer }}</span>
                    }
                  </li>
                }
              </div>
              <mc-link [link]="product.link">
                <button mat-stroked-button color="primary">
                  {{ product.buttonText }}
                </button>
              </mc-link>
            </ng-container>
          </mc-card>
        }
      </div>
    </mc-page-section>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2.5rem;

      margin: 3rem 0;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.7rem;
      color: #561f4b;
    }

    .services {
      margin-bottom: 1.2rem;
      width: 100%;
    }

    .services .clickable {
      text-decoration: underline;
      text-decoration-style: dashed;
    }

    .services li {
      display: flex;
      align-items: center;
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: var(--marmicode-primary-color);
    }

    .services mat-icon {
      padding-top: 0.2rem;
      font-size: 1.1rem;
      margin-right: 0.5rem;
      color: var(--marmicode-accent-color);
    }

    .offer {
      margin-left: 0.5rem;
      color: var(--marmicode-accent-color);
      font-size: 0.95em;
      font-style: italic;
    }
  `,
})
export class TheMenu {
  readonly products: Product[] = [
    {
      icon: 'menu_book',
      title: 'Courses & Cookbooks',
      description: 'Self-paced learning, no fluff, just the sauce.',
      link: { href: 'https://courses.marmicode.io/' },
      services: [
        {
          icon: 'school',
          text: 'Pragmatic Angular Testing',
          offer: 'starts at 80€',
        },
        {
          icon: 'book',
          text: 'Free Cookbook',
          href: externalLinks.cookbookUrl,
        },
      ],
      buttonText: 'VIEW COURSE',
    },
    {
      icon: 'school',
      title: 'Workshops',
      description: 'Hands on sessions for devs who want level up fast.',
      link: { route: workshopRouterHelper.list() },
      services: [
        {
          icon: 'school',
          text: 'Angular Testing, AI-Assisted Dev, Nx, Playwright, Vitest…',
        },
        {
          icon: 'groups',
          text: 'Public & in-house, OPCO-financed',
        },
      ],
      buttonText: 'SEE ALL WORKSHOPS',
    },
    {
      icon: 'explore',
      title: 'Team Coaching',
      description:
        'Stuck on architecture or testing strategy? Get a focused monthly partnership that charts a steadier path to predictable delivery — keeping the bar high as AI writes more of the code.',
      link: { route: coachingRouterHelper.coaching() },
      services: [
        {
          icon: 'group',
          text: 'Team Coaching',
          offer: 'from €2 500 / month',
        },
      ],
      buttonText: 'LEARN MORE',
    },
  ];
}

interface Product {
  icon: string;
  title: string;
  description: string;
  services: Array<{
    icon: string;
    text: string;
    href?: string;
    offer?: string;
  }>;
  buttonText: string;
  link: Link;
}
