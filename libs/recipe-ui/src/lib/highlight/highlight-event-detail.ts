import { HighlightZone } from './highlight-info';

export interface HighlightEventDetail {
  zone: HighlightZone;
}

export function createHighlightEventDetail(
  detail: HighlightEventDetail
): HighlightEventDetail {
  return detail;
}
