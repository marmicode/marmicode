import { describe, it } from 'vitest';
import { SegmentedControl } from './segmented-control.ng';

describe(SegmentedControl.name, () => {
  it.todo('segmented control selects one option', () => {
    // Mount `SegmentedControl` with options All / Cohort / Workshops and value `null` (All).
    // Click "Cohort".
    // Assert the bound value is `'cohort'`, "Cohort" has `aria-pressed="true"`, and the others have `"false"`.
  });

  it.todo('segmented control hides emojis from screen readers', () => {
    // Mount with an option `{ label: 'Cohort', emoji: '👥' }`.
    // Assert the button's accessible name is "Cohort".
  });
});
