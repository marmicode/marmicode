import { Link } from '@marmicode/shared/ui';
import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';

/**
 * What a training tile shows:
 * workshops, cohorts and video courses alike.
 */
export interface TrainingTileData {
  id: string;
  format: TrainingFormat;
  language: TrainingLanguage;
  title: string;
  subheading: string;
  thumbnailUri: string;
  pictureAltText: string;
  /**
   * Already localized, e.g. "3 Days", "6 Weeks" or "4.5 Hours".
   */
  duration: string;
  /**
   * The lowest price, shown as "From €120".
   */
  price: number;
  /**
   * An internal route, or an external URL that opens in a new tab.
   */
  link: Link;
  viewTransitionName?: string;

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
