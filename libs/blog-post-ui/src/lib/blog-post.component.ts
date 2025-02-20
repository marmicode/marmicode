import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { MatDividerModule, MatDivider } from '@angular/material/divider';
import { BlockGroupModule } from '@marmicode/block-api';
import { ResourceHeaderModule, ResourceTitleBannerModule, ResourceType } from '@marmicode/resource-api';
import { RxState } from '@rx-angular/state';
import { select } from '@rx-angular/state/selections';
import { PushPipe } from '@rx-angular/template/push';
import { map } from 'rxjs/operators';
import { BlogPost } from './blog-post';
import { markdownToFrameBlockGroups } from './markdown-to-frame-block-groups';
import { FollowButtonModule, FollowButtonComponent } from './social/follow-button.component';
import { ShareButtonsModule, ShareButtonsComponent } from './social/share-buttons.component';
import { ResourceHeaderComponent } from '../../../resource-ui/src/lib/resource-header.component';
import { BlockGroupComponent } from '../../../block-ui/src/lib/block-group/block-group.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-blog-post',
    template: ` <div class="content">
    <!-- Resource title / badge / author etc... -->
    <mc-resource-header
      [resourceInfo]="resourceInfo$ | push"
      mode="large"
    ></mc-resource-header>

    <!-- Top social share buttons. -->
    <div class="share-buttons-container">
      <mc-share-buttons
        [author]="author$ | push"
        [title]="title$ | push"
        size="small"
      ></mc-share-buttons>
    </div>

    <!-- Picture. -->
    <div class="picture-container">
      <img
        *ngIf="pictureUri$ | push as pictureUri"
        [alt]="title$ | push"
        [src]="pictureUri"
        class="picture"
      />
    </div>

    <!-- Blog content. -->
    <mc-block-group
      *ngFor="let blockGroup of blockGroups$ | push"
      [blockGroup]="blockGroup"
      desktopLayout="column"
    ></mc-block-group>

    <mat-divider></mat-divider>

    <div class="footer-buttons">
      <!-- Social share buttons. -->
      <mc-share-buttons
        [author]="author$ | push"
        [title]="title$ | push"
      ></mc-share-buttons>

      <!-- Follow button. -->
      <mc-follow-button [author]="author$ | push"></mc-follow-button>
    </div>
  </div>`,
    styles: [
        `
      .share-buttons-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .content {
        margin: auto;
        max-width: 1000px;
      }

      .picture-container {
        margin-top: 20px;
        text-align: center;
        width: 100%;
      }

      .picture {
        max-width: 100%;
      }

      .footer-buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
      }
    `,
    ],
    providers: [RxState],
    standalone: true,
    imports: [
        ResourceHeaderComponent,
        ShareButtonsComponent,
        NgIf,
        NgFor,
        BlockGroupComponent,
        MatDivider,
        FollowButtonComponent,
        PushPipe,
    ],
})
export class BlogPostComponent {
  @Input() set blogPost(blogPost: BlogPost) {
    this._state.set({ blogPost });
  }

  author$ = this._state.select('blogPost', 'author');

  blockGroups$ = this._state
    .select('blogPost')
    .pipe(select(map((blogPost) => markdownToFrameBlockGroups(blogPost.text))));

  pictureUri$ = this._state.select('blogPost', 'pictureUri');

  resourceInfo$ = this._state.select('blogPost').pipe(
    select(
      map((blogPost) => ({
        type: ResourceType.BlogPost,
        ...blogPost,
      }))
    )
  );

  resourceType = ResourceType.BlogPost;

  title$ = this._state.select('blogPost', 'title');

  constructor(private _state: RxState<{ blogPost: BlogPost }>) {}
}

@NgModule({
    exports: [BlogPostComponent],
    imports: [
        BlockGroupModule,
        CommonModule,
        MatDividerModule,
        PushPipe,
        ResourceHeaderModule,
        ResourceTitleBannerModule,
        ShareButtonsModule,
        FollowButtonModule,
        BlogPostComponent,
    ],
})
export class BlogPostModule {}
