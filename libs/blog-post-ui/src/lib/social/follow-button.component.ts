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
    <a
      *ngIf="author?.twitter"
      [href]="'https://twitter.com/' + author.twitter"
      target="_blank"
    >
      <button class="button">
        <fa-icon [icon]="faXTwitter" class="icon"></fa-icon>
        <span>Follow &#64;{{ author.twitter }}</span>
      </button>
    </a>
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
    `,
  ],
  imports: [NgIf, FontAwesomeModule],
})
export class FollowButtonComponent {
  @Input() author: AuthorSocialInfo;

  faXTwitter = faXTwitter;
}

@NgModule({
  exports: [FollowButtonComponent],
  imports: [CommonModule, FontAwesomeModule, FollowButtonComponent],
})
export class FollowButtonModule {}
