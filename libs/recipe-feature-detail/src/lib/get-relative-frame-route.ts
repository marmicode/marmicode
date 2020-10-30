export function getRelativeFrameRoute(frameSlug: string) {
  /* Using relative path to keep the recipe type prefix in the URL. */
  return ['..', frameSlug];
}
