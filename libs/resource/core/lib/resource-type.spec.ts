import { describe, expect, it } from 'vitest';
import { getResourceKind, ResourceType } from './resource-type';

describe(getResourceKind.name, () => {
  it('videos vs articles', () => {
    expect(getResourceKind(ResourceType.ExternalVideo)).toBe('video');
    expect(getResourceKind(ResourceType.BlogPost)).toBe('article');
  });
});
