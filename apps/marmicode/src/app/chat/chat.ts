import {
  DestroyRef,
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { Platform } from '@marmicode/shared/utils';
import { Crisp as CrispSdk } from 'crisp-sdk-web';
import { environment } from '../../environments/environment';

export function provideChatWidget(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const chat = inject(Chat);
      const destroyRef = inject(DestroyRef);
      const platform = inject(Platform);

      if (platform.isBrowser()) {
        chat.showWidget();
        destroyRef.onDestroy(() => chat.hideWidget());
      }
    }),
  ]);
}

@Injectable({ providedIn: 'root' })
class Chat {
  constructor() {
    CrispSdk.configure(environment.crispWebsiteId, { autoload: false });
  }

  showWidget() {
    CrispSdk.chat.show();
  }

  hideWidget() {
    CrispSdk.chat.hide();
  }
}
