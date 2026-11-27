import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { AuthorSocialInfo } from './author-social-info';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-follow-button',
  template: `
    <!-- Twitter follow button. -->
    @if (author.twitter) {
      <a [href]="'https://twitter.com/' + author.twitter" target="_blank">
        <button class="button">
          <fa-icon [icon]="faXTwitter" class="icon"></fa-icon>
          <span>Follow &#64;{{ author.twitter }}</span>
        </button>
      </a>
    }
  `,
  styles: [
    `
      a {
        text-decoration: none;
      }

      .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;

        cursor: pointer;
        background-color: #fff;
        color: #000;
        border: 2px solid;
        border-radius: 0.2em;
        height: 2.5em;
        font-size: 14px;
        font-weight: bold;
        outline: none;
        transition:
          background-color 0.3s,
          color 0.3s;
      }

      .button:hover {
        background-color: #000;
        color: #fff;
      }

      .icon {
        font-size: 1.2em;
        text-align: center;
        margin-right: 5px;
      }

      /* Dark pages: a pill, as the prototype's follow links. */
      :host-context(.mc-page-dark) {
        a {
          display: inline-block;
          border-radius: 999px;
        }

        a:focus-visible {
          outline: 2px solid var(--mc-accent);
          outline-offset: 2px;
        }

        .button {
          height: auto;
          padding: 6px 12px;
          border: 1px solid var(--mc-dark-line-strong);
          border-radius: 999px;
          background: transparent;
          color: var(--mc-dark-muted);
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          transition:
            color 0.2s,
            border-color 0.2s;
        }

        .button:hover {
          border-color: rgba(var(--mc-accent-rgb), 0.5);
          background: transparent;
          color: var(--mc-dark-text);
        }

        .icon {
          font-size: 1em;
        }
      }
    `,
  ],
  imports: [FontAwesomeModule],
})
export class FollowButtonComponent {
  @Input()
  author!: AuthorSocialInfo;
  faXTwitter = faXTwitter;
}
@NgModule({
  exports: [FollowButtonComponent],
  imports: [CommonModule, FontAwesomeModule, FollowButtonComponent],
})
export class FollowButtonModule {}
