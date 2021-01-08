export interface HighlightSection {
  start: number;
  end: number;
}

export interface HighlightZone {
  color: string;
  sections: HighlightSection[];
}

export function createHighlightSection(
  section: HighlightSection
): HighlightSection {
  return section;
}

export function createHighlightZone(zone: HighlightZone): HighlightZone {
  return zone;
}
