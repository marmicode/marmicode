import { UrlMatcher } from '@angular/router';

export const or = (paths: string[]): UrlMatcher => (segments) =>
  segments.length >= 1 && paths.includes(segments[0].path)
    ? { consumed: [segments[0]] }
    : null;
