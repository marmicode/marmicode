import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SiteConfig } from './site-config';

export function provideSiteConfig(config: SiteConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: SiteConfig, useValue: config }]);
}
