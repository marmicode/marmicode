import { mountStory } from '@jscutlery/cypress-mount';
/* eslint-disable-next-line @nrwl/nx/enforce-module-boundaries */
import {
  Default,
  Video,
} from '../../../../libs/blog-post-ui/src/lib/blog-post.stories';

describe('BlogPostComponent', () => {
  it('should show blog', () => {
    mountStory(Default);
    cy.snapshot();
  });

  it('should show video', () => {
    mountStory(Video);
    cy.snapshot();
  });
});
