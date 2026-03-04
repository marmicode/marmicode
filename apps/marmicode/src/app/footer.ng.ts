import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  externalLinks,
  resourceSearchRouterHelper,
  servicesRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { LinkComponent } from '@marmicode/shared/ui';
import { appRouterHelper } from './app-router-helper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-footer',
  imports: [LinkComponent],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <!-- Learn -->
        <section>
          <h3 class="section-title">Learn</h3>
          <ul class="link-list">
            <li>
              <mc-link
                color="white"
                href="https://courses.marmicode.io/courses/pragmatic-angular-testing"
                size="small"
              >
                ✅ Angular Testing Course
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                [route]="workshopRouterHelper.list()"
                size="small"
              >
                👨🏻‍🏫 Workshops
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                [route]="resourceSearchRouterHelper.learnEverything()"
                size="small"
              >
                📚 Blog
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                href="https://youtube.com/@marmicode"
                size="small"
              >
                📺 Youtube
              </mc-link>
            </li>
          </ul>
        </section>

        <!-- Stay tuned -->
        <section>
          <h3 class="section-title">Stay tuned</h3>
          <ul class="link-list">
            <li>
              <mc-link
                color="white"
                [href]="externalLinks.contactFormUrl"
                size="small"
              >
                ✉️ Contact Me
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                href="https://bsky.app/profile/younesjd.dev"
                size="small"
              >
                🦋 Bluesky
              </mc-link>
            </li>
            <li>
              <mc-link color="white" href="https://x.com/yjaaidi" size="small">
                X
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                href="https://linkedin.com/in/yjaaidi"
                size="small"
              >
                LinkedIn
              </mc-link>
            </li>
          </ul>
        </section>
      </div>

      <!-- Legal -->
      <div class="legal">
        <span class="legal-links">
          <mc-link
            color="white"
            href="https://courses.marmicode.io/pages/legal"
            size="small"
            >Legal</mc-link
          >
          ·
          <mc-link
            color="white"
            href="https://courses.marmicode.io/pages/terms-and-conditions"
            size="small"
            >Terms</mc-link
          >
          ·
          <mc-link
            color="white"
            href="https://courses.marmicode.io/pages/privacy-policy"
            size="small"
            >Privacy</mc-link
          >
        </span>
        <p class="copyright">Copyright © {{ year }} Marmicode.</p>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
      background-color: var(--marmicode-primary-color);
      color: white;
    }

    .footer {
      padding: 48px 24px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-content {
      display: flex;
      gap: 15vw;
      justify-content: center;
      flex-wrap: wrap;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;
      text-decoration: none;
    }

    .brand:hover {
      opacity: 0.9;
    }

    .logo {
      flex-shrink: 0;
    }

    .brand-name {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-align: center;
      text-transform: uppercase;
      margin: 0 0 16px;
      opacity: 0.9;
    }

    .link-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .link-list li {
      margin-bottom: 8px;
    }

    .link-list a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
    }

    .link-list a:hover {
      color: white;
      text-decoration: underline;
    }

    .author-name {
      font-weight: 600;
      margin: 0 0 4px;
    }

    .author-bio {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.5;
      opacity: 0.9;
    }

    .author-bio mc-link ::ng-deep a {
      color: var(--marmicode-accent-bright-color);
    }

    .legal {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 24px;
      text-align: center;
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .legal-links {
      margin-right: 8px;
    }

    .legal a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
    }

    .legal a:hover {
      color: white;
      text-decoration: underline;
    }

    .copyright {
      margin: 8px 0 0;
    }
  `,
})
export class Footer {
  appRouterHelper = appRouterHelper;
  resourceSearchRouterHelper = resourceSearchRouterHelper;
  servicesRouterHelper = servicesRouterHelper;
  workshopRouterHelper = workshopRouterHelper;
  externalLinks = externalLinks;
  year = new Date().getFullYear();
}
