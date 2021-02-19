import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { BlockGroupModule } from '@marmicode/block-api';
import {
  ResourceTitleBannerModule,
  ResourceType,
} from '@marmicode/resource-api';
import { ResourceHeaderModule } from '@marmicode/resource-ui';
import { WipModule } from '@marmicode/shared-utils';
import { RxState, select } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { BlogPost } from './blog-post';
import { markdownToFrameBlockGroups } from './markdown-to-frame-block-groups';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post',
  template: ` <mc-resource-title-banner
      *mcNotWip
      [resourceType]="resourceType"
      [title]="title$ | async"
    ></mc-resource-title-banner>
    <div class="content">
      <mc-resource-header
        *mcWip
        [resourceInfo]="resourceInfo$ | async"
      ></mc-resource-header>
      <div class="picture-container">
        <img
          *ngIf="pictureUri$ | async as pictureUri"
          [alt]="title$ | async"
          [src]="pictureUri"
          class="picture"
        />
      </div>

      <mc-block-group
        *ngFor="let blockGroup of blockGroups$ | async"
        [blockGroup]="blockGroup"
        desktopLayout="column"
      ></mc-block-group>
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
    ResourceTitleBannerModule,
    ResourceHeaderModule,
    WipModule,
  ],
})
export class BlogPostModule {}
