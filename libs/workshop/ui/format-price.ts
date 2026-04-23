import { WorkshopLanguage } from '@marmicode/workshop/core';

export function formatPrice({
  price,
  locale,
}: {
  price: number;
  locale: WorkshopLanguage;
}): string {
  const formatted = price.toLocaleString(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });
  return locale === 'fr' ? `${formatted} HT` : formatted;
}
