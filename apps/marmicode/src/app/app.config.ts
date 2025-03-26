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
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { provideUpdateEffects, UpdateEffects } from './update/update.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    ScreenTrackingService,
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
      }),
    ),
    provideAnalytics(() => getAnalytics()),
    provideEffects(UpdateEffects),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideUpdateEffects(),
  ],
};
