import { Meta } from '@storybook/angular';
import { BlogPostComponent, BlogPostModule } from './blog-post.component';

export default {
  title: 'BlogPost',
};

export const Default = () =>
  ({
    title: 'Default',
    moduleMetadata: {
      imports: [BlogPostModule],
    },
    component: BlogPostComponent,
  } as Meta);
