import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  coachingRouterHelper,
  externalLinks,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';

/**
 * Dark minimal footer: the four sections, socials, legal links and copyright.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-site-footer',
  imports: [RouterLink],
  template: `
    <footer>
      <div class="wrap">
        <nav aria-label="Sections">
          @for (section of sections; track section.label) {
            <a [routerLink]="section.route">{{ section.label }}</a>
          }
          <a
            [href]="externalLinks.contactFormUrl"
            rel="noopener"
            target="_blank"
            >Contact</a
          >
        </nav>
        <nav aria-label="Socials">
          @for (social of socials; track social.label) {
            <a [href]="social.href" rel="noopener" target="_blank">{{
              social.label
            }}</a>
          }
        </nav>
      </div>
      <div class="wrap legal">
        <span>© {{ year }} Marmicode</span>
        <nav aria-label="Legal">
          @for (legal of legalLinks; track legal.label) {
            <a [href]="legal.href" rel="noopener" target="_blank">{{
              legal.label
            }}</a>
          }
        </nav>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      background: var(--mc-dark-bg);
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-sans);
      font-size: 14px;
      line-height: 1.55;
    }

    footer {
      border-top: 1px solid var(--mc-dark-line);
      padding: 28px 0 96px;
    }

    .wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    .legal {
      margin-top: 20px;
      font-size: 13px;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
    }

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s;
    }

    a:hover {
      color: var(--mc-dark-text);
    }
  `,
})
export class SiteFooter {
  protected readonly externalLinks = externalLinks;
  protected readonly sections = [
    { label: 'Library', route: resourceSearchRouterHelper.library() },
    { label: 'Training', route: workshopRouterHelper.list() },
    { label: 'Coaching', route: coachingRouterHelper.coaching() },
  ];
  protected readonly socials = [
    { label: 'YouTube', href: 'https://youtube.com/@marmicode' },
    { label: 'Bluesky', href: 'https://bsky.app/profile/younesjd.dev' },
    { label: 'X', href: 'https://x.com/yjaaidi' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yjaaidi' },
  ];
  protected readonly legalLinks = [
    { label: 'Legal', href: 'https://courses.marmicode.io/pages/legal' },
    {
      label: 'Terms',
      href: 'https://courses.marmicode.io/pages/terms-and-conditions',
    },
    {
      label: 'Privacy',
      href: 'https://courses.marmicode.io/pages/privacy-policy',
    },
  ];
  protected readonly year = new Date().getFullYear();
}
