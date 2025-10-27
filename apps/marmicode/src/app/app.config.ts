import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
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
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
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
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    /* HACK: use withEnabledBlockingInitialNavigation() to avoid flicker.
     * TODO: remove it after migrating to Angular 20. */
    provideRouter(
      routes,
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
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
