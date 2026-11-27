import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TrainingTileData } from './training-tile-data';

/**
 * Dark training card. The title link covers the whole card, as in TrainingPreview.
 * Carries `lang`, and announces its languages in the card's own language (visually hidden).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-tile',
  template: `TrainingTile - 🚧 work in progress`,
})
export class TrainingTile {
  training = input.required<TrainingTileData>();
  /** 'card' = workshop grid card; 'wide' = picture left, text right (cohort, video course). */
  layout = input<'card' | 'wide'>('card');
  /** Accent border + glow, used for the cohort. */
  highlighted = input(false);
}
