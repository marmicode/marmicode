import { describe, expect, it } from 'vitest';
import { formatOffer } from './format-offer';

describe(formatOffer.name, () => {
  it('formats an early bird offer', () => {
    expect(
      formatOffer({
        offer: { type: 'early-bird', price: 870, originalPrice: 1070 },
        locale: 'en',
      }),
    ).toBe('🐣 Early Bird starts at €870');
  });

  it('formats a last minute offer', () => {
    expect(
      formatOffer({ offer: { type: 'last-minute', price: 870 }, locale: 'en' }),
    ).toBe('⏰ Last Minute starts at €870');
  });

  it('formats an offer in french', () => {
    expect(
      formatOffer({
        offer: { type: 'early-bird', price: 870, originalPrice: 1070 },
        locale: 'fr',
      }).replace(/\s/g, ' '),
    ).toBe('🐣 Early Bird à partir de 870 € HT');
  });
});
