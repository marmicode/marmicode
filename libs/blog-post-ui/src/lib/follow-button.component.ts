import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export interface AuthorSocialInfo {
  name: string;
  twitter: string;
}

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
      <button class="button" fxLayout="row" fxLayoutAlign="center center">
        <fa-icon [icon]="faTwitter" class="icon"></fa-icon>
        <span>Follow @{{ author.twitter }}</span>
      </button>
    </a>
  `,
  styles: [
    `
      a {
        text-decoration: none;
      }

      .button {
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
  imports: [CommonModule, FlexModule, FontAwesomeModule],
})
export class FollowButtonModule {}
