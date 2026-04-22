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
  const isFrench =
    typeof locale === 'string'
      ? locale.startsWith('fr')
      : Array.isArray(locale) && locale[0]?.startsWith('fr');
  return isFrench ? `${formatted} HT` : formatted;
}
