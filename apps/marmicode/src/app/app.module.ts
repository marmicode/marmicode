import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/compat/analytics';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZonelessFixesEffects } from '@marmicode/shared-utils';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavModule } from './nav.component';
import { provideUpdateEffects, UpdateEffects } from './update/update.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireAnalyticsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'marmicode' }),
    EffectsModule.forRoot([UpdateEffects, ZonelessFixesEffects]),
    HttpClientModule,
    LayoutModule,
    NavModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    StoreModule.forRoot(
      {
        router: routerReducer
      },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    ScreenTrackingService,
    provideUpdateEffects(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
