import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

/* Polyfill Symbol.dispose for Jest (Explicit Resource Management - ES2024). */
if (typeof Symbol !== 'undefined' && !(Symbol as { dispose?: symbol }).dispose) {
  (Symbol as { dispose: symbol }).dispose = Symbol('Symbol.dispose');
}

setupZonelessTestEnv();
