export function formatPrice({
  price,
  locale,
}: {
  price: number;
  locale: Intl.LocalesArgument;
}): string {
  return price.toLocaleString(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });
}
