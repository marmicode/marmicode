import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { BlogPost } from './blog-post';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post',
  template: `🚧 blog-post`,
})
export class BlogPostComponent {
  @Input() blogPost: BlogPost;
}

@NgModule({
  declarations: [BlogPostComponent],
  exports: [BlogPostComponent],
  imports: [CommonModule],
})
export class BlogPostModule {}
