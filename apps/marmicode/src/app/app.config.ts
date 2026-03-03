import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  AnalyticsModule,
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideUpdateEffects } from './update/update.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    /* HACK: This is a workaround to fix tracking.
     * Cf. https://github.com/angular/angularfire/issues/3633#issuecomment-2817498717 */
    importProvidersFrom(AnalyticsModule),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
      }),
    ),

    ScreenTrackingService,
    provideAnalytics(() => getAnalytics()),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideRouterStore(),
    provideStore({ router: routerReducer }),
    provideUpdateEffects(),
  ],
};
