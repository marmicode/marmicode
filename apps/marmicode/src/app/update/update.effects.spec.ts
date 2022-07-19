import { ApplicationRef } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { of, Subject } from 'rxjs';
import { UpdateDialogComponent } from './update-dialog.component';
import { UpdateEffects } from './update.effects';

jest.mock('@angular/material/dialog');

describe('UpdateEffects', () => {
  it('should check for updates every 30s', fakeAsync(() => {
    const { mockSwUpdate, unsubscribe } = setUpCheckForUpdate();

    tick();

    expect(mockSwUpdate.checkForUpdate).toBeCalledTimes(1);

    tick(29999);

    expect(mockSwUpdate.checkForUpdate).toBeCalledTimes(1);

    tick(30000);

    expect(mockSwUpdate.checkForUpdate).toBeCalledTimes(2);

    unsubscribe();
  }));

  it('should prompt user for reload', fakeAsync(() => {
    const { mockDialog, mockSwUpdate, triggerUpdateAvailable, unsubscribe } =
      setUpUpdate();

    expect(mockDialog.open).not.toBeCalled();

    triggerUpdateAvailable();

    tick();

    /* Check prompt is called. */
    expect(mockDialog.open).toBeCalledTimes(1);
    expect(mockDialog.open).toBeCalledWith(UpdateDialogComponent, {
      backdropClass: 'mc-overlay-backdrop',
    });
    expect(mockSwUpdate.activateUpdate).not.toBeCalled();

    unsubscribe();
  }));

  it('should reprompt user after 30s', fakeAsync(() => {
    const { closeDialog, mockDialog, triggerUpdateAvailable, unsubscribe } =
      setUpUpdate();

    triggerUpdateAvailable();

    tick(29999);

    closeDialog();

    tick(30000);

    expect(mockDialog.open).toBeCalledTimes(2);

    unsubscribe();
  }));

  it(`shouldn't reprompt user after 30s if dialog is still open`, fakeAsync(() => {
    const { mockDialog, triggerUpdateAvailable, unsubscribe } = setUpUpdate();

    triggerUpdateAvailable();

    tick(29999);

    expect(mockDialog.open).toBeCalledTimes(1);

    tick(30000);

    expect(mockDialog.open).toBeCalledTimes(1);

    unsubscribe();
  }));

  /**
   * Use this to test the UpdateEffects.checkForUpdate effect.
   */
  function setUpCheckForUpdate() {
    const utils = setUp();
    const subscription = utils.updateEffects.checkForUpdate$.subscribe();
    return {
      ...utils,
      unsubscribe() {
        subscription.unsubscribe();
      },
    };
  }

  /**
   * Use this to test the UpdateEffects.update effect.
   */
  function setUpUpdate() {
    const utils = setUp();
    const subscription = utils.updateEffects.update$.subscribe();
    return {
      ...utils,
      unsubscribe() {
        subscription.unsubscribe();
      },
    };
  }

  /* Set up effects service. */
  function setUp() {
    const mockDialog: jest.Mocked<Pick<MatDialog, 'open'>> = {
      open: jest.fn(),
    };
    const mockDialogRef: jest.Mocked<
      Pick<MatDialogRef<unknown>, 'afterClosed'>
    > = {
      afterClosed: jest.fn(),
    };

    const dialogAfterClosed$ = new Subject<void>();
    mockDialogRef.afterClosed.mockReturnValue(dialogAfterClosed$);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockDialog.open.mockReturnValue(mockDialogRef as any);

    const versionUpdates$ = new Subject<VersionEvent>();

    const mockSwUpdate: jest.Mocked<
      Pick<
        SwUpdate,
        'activateUpdate' | 'checkForUpdate' | 'isEnabled' | 'versionUpdates'
      >
    > = {
      activateUpdate: jest.fn(),
      checkForUpdate: jest.fn(),
      versionUpdates: versionUpdates$,
      isEnabled: true,
    };
    mockSwUpdate.checkForUpdate.mockResolvedValue(true);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [
        {
          provide: ApplicationRef,
          useValue: {
            isStable: of(true),
          } as ApplicationRef,
        },
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
        {
          provide: SwUpdate,
          useValue: mockSwUpdate,
        },
      ],
    });

    return {
      mockDialog,
      mockSwUpdate,
      updateEffects: TestBed.inject(UpdateEffects),
      closeDialog() {
        dialogAfterClosed$.next();
        dialogAfterClosed$.complete();
      },
      triggerUpdateAvailable() {
        versionUpdates$.next({
          type: 'VERSION_READY',
        } as VersionEvent);
      },
    };
  }
});
