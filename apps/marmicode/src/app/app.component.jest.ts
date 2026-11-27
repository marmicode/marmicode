import { describe, it } from '@jest/globals';
import { AppComponent } from './app.component';

/* Jest's `it.todo` does not accept a body, so WIP tests use `it.skip`. */
describe(AppComponent.name, () => {
  it.skip('nav links to the three sections and the contact form', () => {
    // Arrange WIP mode on, then mount `AppComponent` with the router.
    // Assert links Library → `/learn/everything`, Training → `/workshops`, Coaching → `/coaching`.
    // Assert "Contact me" → contact form URL with `target="_blank"`.
  });

  it.skip('nav highlights the current section', () => {
    // Navigate to `/cohorts/from-drift-to-trust-for-angular`.
    // Assert "Training" has `aria-current="page"` and "Library" does not.
    // Navigate to `/blog/some-post` and assert "Library" has `aria-current="page"`.
  });

  it.skip('old shell without WIP mode', () => {
    // Arrange WIP mode off; mount `AppComponent`.
    // Assert the old `mc-nav` and `mc-footer` render, and `mc-site-nav` doesn't.
  });
});
