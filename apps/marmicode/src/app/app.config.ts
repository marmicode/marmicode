import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { provideUpdateEffects, UpdateEffects } from './update/update.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    ScreenTrackingService,
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(BrowserModule.withServerTransition({ appId: 'marmicode' })),
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })),
    importProvidersFrom(StoreRouterConnectingModule.forRoot()),
    provideAnalytics(() => getAnalytics()),
    provideEffects(UpdateEffects),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouterStore(),
    provideStore(),
    provideUpdateEffects()
  ]
}
