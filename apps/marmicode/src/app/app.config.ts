import {
  provideHttpClient,
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
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideUpdateEffects, UpdateEffects } from './update/update.effects';

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
    provideClientHydration(withEventReplay()),
    provideAnalytics(() => getAnalytics()),
    provideAnimations(),
    provideEffects(UpdateEffects),
    provideExperimentalZonelessChangeDetection(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideUpdateEffects(),
  ],
};
