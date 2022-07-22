// @ts-ignore
import utils from '@percy/sdk-utils';

/**
 * @hack uploading a placeholder to make sure we always have a snapshot
 * and avoid the "No snapshot" error when using Nx affected.
 */
utils.postSnapshot({
  url: 'https://fake-placeholder-url.marmicode.io',
  domSnapshot:
    '<h1>👋 Placeholder to make sure there is always a snapshot</h1>',
});
