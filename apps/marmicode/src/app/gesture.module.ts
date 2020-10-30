import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import {
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
  HammerModule,
} from '@angular/platform-browser';
import 'hammerjs';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  options = {
    cssProps: {
      /* Allow text selection.
       * This is used in combination with `deltaTime` filtering:
       * if the swipe is too slow, the user is probably trying to select
       * the text or something. */
      userSelect: undefined as unknown,
    },
  };
}

@NgModule({
  declarations: [],
  exports: [],
  imports: [HammerModule],
})
export class GestureModule {
  static forRoot(): ModuleWithProviders<GestureModule> {
    return {
      ngModule: GestureModule,
      providers: [
        {
          provide: HAMMER_GESTURE_CONFIG,
          useClass: HammerConfig,
        },
      ],
    };
  }
}
