import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { BlockGroupModule } from '@marmicode/block-api';
import { RxState, select } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { BlogPost } from './blog-post';
import { markdownToFrameBlockGroups } from './markdown-to-frame-block-groups';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post',
  template: `<mc-block-group
    *ngFor="let blockGroup of blockGroups$ | async"
    [blockGroup]="blockGroup"
    class="mc-flex-column"
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

  constructor(private _state: RxState<{ blogPost: BlogPost }>) {}
}

@NgModule({
  declarations: [BlogPostComponent],
  exports: [BlogPostComponent],
  imports: [CommonModule, BlockGroupModule],
})
export class BlogPostModule {}
