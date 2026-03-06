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
                size="small"
                href="https://courses.marmicode.io/courses/pragmatic-angular-testing"
              >
                ✅ Angular Testing Course
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                size="small"
                [route]="workshopRouterHelper.list()"
              >
                👨🏻‍🏫 Workshops
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                size="small"
                [route]="resourceSearchRouterHelper.learnEverything()"
              >
                📚 Blog
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                size="small"
                href="https://youtube.com/@marmicode"
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
                size="small"
                [href]="externalLinks.contactFormUrl"
              >
                ✉️ Contact Me
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                size="small"
                href="https://bsky.app/profile/younesjd.dev"
              >
                🦋 Bluesky
              </mc-link>
            </li>
            <li>
              <mc-link color="white" size="small" href="https://x.com/yjaaidi">
                X
              </mc-link>
            </li>
            <li>
              <mc-link
                color="white"
                size="small"
                href="https://linkedin.com/in/yjaaidi"
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
          <mc-link href="https://courses.marmicode.io/pages/legal"
            ><span>Legal</span></mc-link
          >
          ·
          <mc-link
            href="https://courses.marmicode.io/pages/terms-and-conditions"
            ><span>Terms</span></mc-link
          >
          ·
          <mc-link href="https://courses.marmicode.io/pages/privacy-policy"
            ><span>Privacy</span></mc-link
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
      font-size: 0.9rem;
      opacity: 0.9;

      li {
        margin: 0.5rem 0;
      }
    }

    .legal {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin-top: 1rem;
      padding-top: 1rem;
      text-align: center;
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .legal-links {
      margin-right: 8px;

      span {
        color: var(--marmicode-accent-bright-color);
      }
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
