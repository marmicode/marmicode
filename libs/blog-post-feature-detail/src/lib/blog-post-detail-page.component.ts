import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post-detail-page',
  template: `🚧 blog-post-detail-page`,
})
export class BlogPostDetailPageComponent {}

@NgModule({
  declarations: [BlogPostDetailPageComponent],
  exports: [BlogPostDetailPageComponent],
  imports: [CommonModule],
})
export class BlogPostDetailPageModule {}
