export function formatPrice({
  price,
  locale,
}: {
  price: number;
  locale: Intl.LocalesArgument;
}): string {
  const formatted = price.toLocaleString(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });
  return _isFrenchLocale(locale) ? `${formatted} HT` : formatted;
}

function _isFrenchLocale(locale: Intl.LocalesArgument): boolean {
  const startsWithFr = (tag: string | Intl.Locale) =>
    (typeof tag === 'string' ? tag : tag.language).startsWith('fr');
  if (Array.isArray(locale)) {
    return locale.length > 0 && startsWithFr(locale[0]);
  }
  return startsWithFr(locale as string | Intl.Locale);
}
