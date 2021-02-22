import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { BlockGroupModule } from '@marmicode/block-api';
import {
  ResourceHeaderModule,
  ResourceTitleBannerModule,
  ResourceType,
} from '@marmicode/resource-api';
import { WipModule } from '@marmicode/shared-utils';
import { RxState, select } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { BlogPost } from './blog-post';
import { markdownToFrameBlockGroups } from './markdown-to-frame-block-groups';
import { ShareButtonsModule } from './share-buttons.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post',
  template: ` <div class="content">
    <!-- Resource title / badge / author etc... -->
    <mc-resource-header
      [resourceInfo]="resourceInfo$ | async"
      mode="large"
    ></mc-resource-header>

    <!-- Picture. -->
    <div class="picture-container">
      <img
        *ngIf="pictureUri$ | async as pictureUri"
        [alt]="title$ | async"
        [src]="pictureUri"
        class="picture"
      />
    </div>

    <!-- Blog content. -->
    <mc-block-group
      *ngFor="let blockGroup of blockGroups$ | async"
      [blockGroup]="blockGroup"
      desktopLayout="column"
    ></mc-block-group>

    <ng-container *mcWip>
      <mat-divider></mat-divider>

      <div fxLayout="row" fxLayoutAlign="center">
        <mc-share-buttons></mc-share-buttons>
      </div>
    </ng-container>
  </div>`,
  styles: [
    `
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
    `,
  ],
  providers: [RxState],
})
export class BlogPostComponent {
  @Input() set blogPost(blogPost: BlogPost) {
    this._state.set({ blogPost });
  }

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
  declarations: [BlogPostComponent],
  exports: [BlogPostComponent],
  imports: [
    CommonModule,
    BlockGroupModule,
    MatDividerModule,
    ResourceTitleBannerModule,
    ResourceHeaderModule,
    ShareButtonsModule,
    WipModule,
    FlexModule,
  ],
})
export class BlogPostModule {}
