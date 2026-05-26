import {
  DestroyRef,
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { Platform, Public } from '@marmicode/shared/utils';
import { Crisp as CrispSdk } from 'crisp-sdk-web';
import { environment } from '../../environments/environment';

export function provideChatWidget(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const chat = inject(Chat);
      const destroyRef = inject(DestroyRef);

      chat.showWidget();
      destroyRef.onDestroy(() => chat.hideWidget());
    }),
  ]);
}

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    inject(Platform).isBrowser() ? inject(CrispChat) : inject(NoopChat),
})
abstract class Chat {
  abstract showWidget(): void;
  abstract hideWidget(): void;
}
@Injectable({ providedIn: 'root' })
class CrispChat implements Public<Chat> {
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

@Injectable({ providedIn: 'root' })
class NoopChat implements Public<Chat> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showWidget() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideWidget() {}
}
