import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
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
        <fa-icon [icon]="faTwitter" class="icon"></fa-icon>
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
        color: #00acee;
        border: 2px solid;
        border-radius: 0.2em;
        height: 2.5em;
        font-size: 14px;
        font-weight: bold;
        outline: none;
        transition: background-color 0.3s, color 0.3s;
      }

      .button:hover {
        background-color: #00acee;
        color: #fff;
      }

      .icon {
        font-size: 1.2em;
        text-align: center;
        margin-right: 5px;
      }
    `,
  ],
})
export class FollowButtonComponent {
  @Input() author: AuthorSocialInfo;

  faTwitter = faTwitter;
}

@NgModule({
  declarations: [FollowButtonComponent],
  exports: [FollowButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class FollowButtonModule {}
