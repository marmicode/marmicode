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
import { RxState, select } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { BlogPost } from './blog-post';
import { markdownToFrameBlockGroups } from './markdown-to-frame-block-groups';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post',
  template: ` <mc-resource-title-banner
      [resourceType]="resourceType"
      [title]="title$ | async"
    ></mc-resource-title-banner>
    <mc-block-group
      *ngFor="let blockGroup of blockGroups$ | async"
      [blockGroup]="blockGroup"
      desktopLayout="column"
    ></mc-block-group>`,
  providers: [RxState],
})
export class BlogPostComponent {
  @Input() set blogPost(blogPost: BlogPost) {
    this._state.set({ blogPost });
  }

  blockGroups$ = this._state
    .select('blogPost')
    .pipe(select(map((blogPost) => markdownToFrameBlockGroups(blogPost.text))));

  resourceType = ResourceType.BlogPost;

  title$ = this._state.select('blogPost', 'title');

  constructor(private _state: RxState<{ blogPost: BlogPost }>) {}
}

@NgModule({
  declarations: [BlogPostComponent],
  exports: [BlogPostComponent],
  imports: [CommonModule, BlockGroupModule, ResourceTitleBannerModule],
})
export class BlogPostModule {}
