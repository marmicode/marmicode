import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { CONFIG as FIREBASE_ANALYTICS_CONFIG } from '@angular/fire/compat/analytics';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideUpdateEffects, UpdateEffects } from './app/update/update.effects';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
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
    provideUpdateEffects(),
    {
      provide: FIREBASE_ANALYTICS_CONFIG,
      useValue: {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
        anonymize_ip: true
      }
    }
  ]
})
  .catch((err) => console.error(err));
;
