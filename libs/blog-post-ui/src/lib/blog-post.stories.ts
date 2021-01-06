import { Meta } from '@storybook/angular';
import { ResourceType } from '../../../resource-core/src';
import { BlogPostComponent, BlogPostModule } from './blog-post.component';

export default {
  title: 'BlogPost',
};

export interface BlogPostContent {
  text: string;
}

export interface BlogPost {
  id: string;
  type: ResourceType.BlogPost;
  title: string;
  content: BlogPostContent;
}

export const Default = () =>
  ({
    title: 'Default',
    moduleMetadata: {
      imports: [BlogPostModule],
    },
    component: BlogPostComponent,
  } as Meta);
