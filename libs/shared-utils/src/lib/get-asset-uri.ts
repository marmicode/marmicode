/**
 * This is just a workaround to get rid of all `require('!!file-loader!...)`
 * without losing track of all asset usages in the app.
 */
export function getAssetUri(filePath: string) {
  return `/assets/${encodeURIComponent(filePath)}`;
}