import { describe, it } from 'vitest';
import { LibraryPage } from './library-page.ng';

describe(LibraryPage.name, () => {
  it.todo('lists resources newest first, one per row', () => {
    // Arrange a fake `ResourceRepository` with 3 resources (an Nov 2024 article, an Apr 2023 article, a 2022 video).
    // Mount `LibraryPage` on `/learn/everything`.
    // Assert the row titles are newest first, and the video row shows a 40 min ▶ badge and "Watch".
  });

  it.todo('rows show topic tags, not skills', () => {
    // Arrange a resource with skills mapping to Testing and Angular.
    // Assert its row shows the tags "Testing" and "Angular", and no "You will learn" text.
  });

  it.todo('filters by kind, topic and search', () => {
    // Click "Videos" and assert only video rows; reset.
    // Click "RxJS" and assert only RxJS rows and the heading "N results"; reset.
    // Type "signals" and assert only matching rows.
  });

  it.todo('empty search shows the empty state', () => {
    // Type "xyz".
    // Assert "That one hasn't been cooked yet."; click **Show everything** and assert all rows are back with empty search and filters.
  });

  it.todo('skill routes still work', () => {
    // Mount on `/learn/angular-signals` with the fake repository.
    // Assert only that skill's resources are listed.
  });

  it.todo('cookbook banner links to the cookbook', () => {
    // Assert a link to `https://cookbook.marmicode.io` with `target="_blank"` sits above the list.
  });
});
