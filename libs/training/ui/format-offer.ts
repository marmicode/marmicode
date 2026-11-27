import { Offer, TrainingLanguage } from '@marmicode/training/core';
import { formatPrice } from './format-price';
import { TRAINING_LABELS } from './training.i18n';

/**
 * Formats an offer for the banner of a training,
 * e.g. "🐣 Early Bird starts at €870".
 */
export function formatOffer({
  offer,
  locale,
}: {
  offer: Offer;
  locale: TrainingLanguage;
}): string {
  const labels = TRAINING_LABELS[locale];
  const price = formatPrice({ price: offer.price, locale });

  switch (offer.type) {
    case 'early-bird':
      return `${labels.earlyBird} ${labels.priceStartsAt} ${price}`;
    case 'last-minute':
      return `${labels.lastMinute} ${labels.priceStartsAt} ${price}`;
  }
}
