import { HighlightZone } from './highlight-zone';

export interface HighlightEventDetail {
  zone: HighlightZone;
}

export function createHighlightEventDetail(
  detail: HighlightEventDetail
): HighlightEventDetail {
  return detail;
}
