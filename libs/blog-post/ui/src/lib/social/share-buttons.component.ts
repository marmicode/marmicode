import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faLinkedinIn,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { RxState } from '@rx-angular/state';
import { select, selectSlice } from '@rx-angular/state/selections';
import { PushPipe } from '@rx-angular/template/push';
import { ShareButtons } from 'ngx-sharebuttons/buttons';
import { map } from 'rxjs/operators';
import { AuthorSocialInfo } from './author-social-info';

export type Size = 'normal' | 'small';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  /* @hack we would like to apply the theme locally using ShadowDOM but
   * fontawesome adds some global CSS dynamically so we can't use ShadowDOM.*/
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-share-buttons',
  styleUrls: ['./share-buttons.component.scss'],
  template: `
    <share-buttons
      [description]="twitterTitle$ | push"
      [theme]="theme"
      [include]="['x']"
      [style.display]="'inline-block'"
    ></share-buttons>
    <share-buttons
      [description]="defaultTitle$ | push"
      [title]="defaultTitle$ | push"
      [include]="buttons"
      [theme]="theme"
      [style.display]="'inline-block'"
    ></share-buttons>
  `,
  providers: [RxState],
  imports: [ShareButtons, PushPipe],
})
export class ShareButtonsComponent {
  @Input() set author(author: AuthorSocialInfo) {
    this._state.set({ author });
  }

  @Input() set title(title: string) {
    this._state.set({ title });
  }

  @Input() set size(size: Size) {
    this._state.set({ size });
  }

  defaultTitle$ = this._state.select(
    selectSlice(['author', 'title']),
    select(
      map(({ author, title }) => {
        if (title == null) {
          return null;
        }

        const authorName = author?.name;

        return (
          title + (authorName ? ` by ${authorName}` : '') + this._titleSuffix
        );
      }),
    ),
  );
  twitterTitle$ = this._state.select(
    selectSlice(['author', 'title']),
    select(
      map(({ author, title }) => {
        if (title == null) {
          return null;
        }

        const authorName = author?.twitter
          ? author?.twitter
            ? `@${author?.twitter}`
            : ''
          : author?.name;

        return (
          title + (authorName ? ` by ${authorName}` : '') + this._titleSuffix
        );
      }),
    ),
  );

  buttons = ['linkedin', 'facebook', 'copy'];
  theme = 'outline';

  private _titleSuffix = ' on @Marmicode';

  constructor(
    iconLibrary: FaIconLibrary,
    private _state: RxState<{
      title: string;
      author: AuthorSocialInfo;
      size: Size;
    }>,
  ) {
    /* @hack add icons dynamically because `ShareIconsModule` needs
     * to be added to `AppModule` as it's not lazy loading friendly.*/
    iconLibrary.addIcons(faXTwitter);
    iconLibrary.addIcons(faLink);
    iconLibrary.addIcons(faLinkedinIn);
    iconLibrary.addIcons(faFacebookF);

    /* Set default size. */
    this._state.set({ size: 'normal' });
  }
}

@NgModule({
  exports: [ShareButtonsComponent],
  imports: [ShareButtonsComponent],
})
export class ShareButtonsModule {}
