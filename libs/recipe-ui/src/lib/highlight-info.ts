export interface HighlightSection {
  start: number;
  end: number;
}

export interface HighlightZone {
  color: string;
  sections: HighlightSection[];
}

export interface HighlightInfo {
  zones: HighlightZone[];
}

export function createHighlightSection(
  section: HighlightSection
): HighlightSection {
  return section;
}

export function createHighlightInfo(
  highlightInfo: HighlightInfo
): HighlightInfo {
  return highlightInfo;
}
