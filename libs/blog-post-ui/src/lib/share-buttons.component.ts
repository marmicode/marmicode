import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { ShareButtonsModule as NgxShareButtonsModule } from 'ngx-sharebuttons/buttons';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  /* @hack we would like to apply the theme locally using ShadowDOM but
   * fontawesome adds some global CSS dynamically so we can't use ShadowDOM.*/
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-share-buttons',
  styleUrls: ['./share-buttons.component.scss'],
  template: `
    <share-buttons
      [autoSetMeta]="true"
      [include]="buttons"
      [title]="title"
      theme="outline"
    ></share-buttons>
  `,
})
export class ShareButtonsComponent implements OnChanges {
  @Input() authorInfo: {
    twitter: string;
  };
  @Input() title: string;
  buttons = ['twitter', 'linkedin', 'facebook', 'copy'];
  socialTitle: string;

  constructor(iconLibrary: FaIconLibrary) {
    /* @hack add icons dynamically because `ShareIconsModule` needs
     * to be added to `AppModule` as it's not lazy loading friendly.*/
    iconLibrary.addIcons(faTwitter);
    iconLibrary.addIcons(faLink);
    iconLibrary.addIcons(faLinkedinIn);
    iconLibrary.addIcons(faFacebookF);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.title) {
      this.socialTitle = this.title ? `${this.title} by @Marmicode` : null;
    }
  }
}

@NgModule({
  declarations: [ShareButtonsComponent],
  exports: [ShareButtonsComponent],
  imports: [CommonModule, NgxShareButtonsModule],
})
export class ShareButtonsModule {}
