import { mountStory } from '@jscutlery/cypress-mount';
/* eslint-disable-next-line @nrwl/nx/enforce-module-boundaries */
import {
  Default,
  Video,
} from '../../../../libs/blog-post-ui/src/lib/blog-post.stories';

describe('BlogPostComponent', () => {
  beforeEach(() => {
    /* @hack add missing style because this style is inserted dynamically
     * by fortawesome but after the destruction of the DOM for the second test,
     * the style is not inserted again due once CSS is mark as inserted.
     * (Cf. https://github.com/FortAwesome/Font-Awesome/blob/fcec2d1b01ff069ac10500ac42e4478d20d21f4c/js-packages/%40fortawesome/fontawesome-svg-core/index.js#L2164) */
    /* @todo use `mountStory` style args. */
    cy.document().then((doc) => {
      const style: HTMLStyleElement = document.createElement('style');
      const data = document.createTextNode(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('!!raw-loader!../../../../node_modules/@fortawesome/fontawesome-svg-core/styles.css')
          .default
      );
      style.appendChild(data);
      doc.head.appendChild(style);
    });
  });
  it('should show blog', () => {
    mountStory(Default);
    cy.snapshot();
  });

  it('should show video', () => {
    mountStory(Video);
    cy.snapshot();
  });
});
