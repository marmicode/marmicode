export { LocalStorage } from './lib/local-storage.service';
export {
  dematerializeData,
  dematerializeError,
  MaterializedNotification,
  materializeError,
} from './lib/operators/materialize-error';
export {
  deprogressifyData,
  progressify,
  ProgressifyEvent,
  ProgressifyEventType,
} from './lib/operators/progressify';
export { shareReplayWithRefCount } from './lib/operators/share-replay-with-ref-count';
export { Platform } from './lib/platform.service';
export { or } from './lib/route-matchers';
export { TransferStateAdapter } from './lib/transfer-state-adapter.service';
export { TransferStateHelper } from './lib/transfer-state-helper.service';
export { WipModule } from './lib/wip.directive';
export { WipService } from './lib/wip.service';
export { ZonelessFixesEffects } from './lib/zoneless-fixes.effects';
