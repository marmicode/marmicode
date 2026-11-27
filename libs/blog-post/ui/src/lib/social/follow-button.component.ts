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
      /* A pill, as the prototype's follow links. */
      a {
        display: inline-block;
        border-radius: 999px;
        text-decoration: none;
      }

      a:focus-visible {
        outline: 2px solid var(--mc-accent);
        outline-offset: 2px;
      }

      .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;

        cursor: pointer;
        padding: 6px 12px;
        border: 1px solid var(--mc-dark-line-strong);
        border-radius: 999px;
        background: transparent;
        color: var(--mc-dark-muted);
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        outline: none;
        transition:
          color 0.2s,
          border-color 0.2s;
      }

      .button:hover {
        border-color: rgba(var(--mc-accent-rgb), 0.5);
        color: var(--mc-dark-text);
      }

      .icon {
        font-size: 1em;
        text-align: center;
        margin-right: 5px;
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
