import { TrainingLanguage } from '@marmicode/training/core';
import { TrainingPreviewData } from './training-preview.ng';

/**
 * What a dark training tile shows.
 * Backward compatible with `TrainingPreviewData`.
 *
 * @deprecated 🚧 work in progress
 */
export interface TrainingTileData extends TrainingPreviewData {
  /**
   * Every language this training is offered in, English first.
   * Drives the language chips.
   */
  languages: TrainingLanguage[];

  /**
   * Shown crossed out next to `price`, e.g. early-bird offers.
   */
  originalPrice?: number;

  /**
   * Already localized, e.g. "Early bird".
   */
  badge?: string;

  /**
   * Already localized short dates of the next session,
   * e.g. "Jan 12–14" / "5–7 janv.".
   */
  nextSessionDates?: string;
}
