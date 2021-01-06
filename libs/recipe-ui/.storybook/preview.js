import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

import '../../../.storybook/preview';

/**
 * @hack detect when story is changed and reload because custom elements
 * break HMR.
 * Storybook will replace storybook-dynamic-app-root's children.
 * That's when we will prevent our app from re-declaring same elements by faking
 * `customElements.define`.
 * Then we reload the page to redefine elements.
 */
const rootEl = document.querySelector('#root');
rootEl.addEventListener('DOMNodeRemoved', (evt) => {
  if (evt.relatedNode === rootEl) {
    document.location.reload();
  }
});
