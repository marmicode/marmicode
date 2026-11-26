import { TrainingLanguage } from '@marmicode/training/core';

export function formatPrice({
  price,
  locale,
}: {
  price: number;
  locale: TrainingLanguage;
}): string {
  const formatted = price.toLocaleString(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });
  return locale === 'fr' ? `${formatted} HT` : formatted;
}
