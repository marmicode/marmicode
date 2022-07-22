// @ts-ignore
import utils from '@percy/sdk-utils';

const ATTEMPTS = 5;

/**
 * @hack uploading a placeholder to make sure we always have a snapshot
 * and avoid the "No snapshot" error when using Nx affected.
 */
async function tryUploadPlaceholder(remainingAttempts: number = ATTEMPTS - 1) {
  console.log(`Uploading placeholder... (${remainingAttempts} attempts left)`);

  try {
    await utils.postSnapshot({
      url: 'https://fake-placeholder-url.marmicode.io',
      domSnapshot:
        '<h1>Placeholder to make sure there is always a snapshot</h1>',
    });
  } catch {
    if (remainingAttempts === 0) {
      return;
    }

    setTimeout(
      () => tryUploadPlaceholder(remainingAttempts - 1),
      (1000 * ATTEMPTS) / remainingAttempts
    );
  }
}

tryUploadPlaceholder();
