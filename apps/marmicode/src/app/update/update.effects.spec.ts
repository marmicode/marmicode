import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { createObserver } from '@marmicode/testing';
import { of, Subject } from 'rxjs';
import { UpdateDialogComponent } from './update-dialog.component';
import { provideUpdateEffects, UpdateEffects } from './update.effects';

jest.mock('@angular/material/dialog');

jest.useFakeTimers();

describe('UpdateEffects', () => {
  const { observe } = createObserver();

  it('should check for updates every 30s', () => {
    const { mockSwUpdate } = setUpCheckForUpdate();

    jest.advanceTimersToNextTimer();

    expect(mockSwUpdate.checkForUpdate).toBeCalledTimes(1);

    jest.advanceTimersByTime(29999);

    expect(mockSwUpdate.checkForUpdate).toBeCalledTimes(1);

    jest.advanceTimersByTime(30000);

    expect(mockSwUpdate.checkForUpdate).toBeCalledTimes(2);
  });

  it('should prompt user for reload', () => {
    const { mockDialog, mockSwUpdate, triggerUpdateAvailable } = setUpUpdate();

    expect(mockDialog.open).not.toBeCalled();

    triggerUpdateAvailable();

    jest.advanceTimersToNextTimer();

    /* Check prompt is called. */
    expect(mockDialog.open).toBeCalledTimes(1);
    expect(mockDialog.open).toBeCalledWith(UpdateDialogComponent, {
      backdropClass: 'mc-overlay-backdrop'
    });
    expect(mockSwUpdate.activateUpdate).not.toBeCalled();
  });

  it('should reprompt user after 30s', () => {
    const { closeDialog, mockDialog, triggerUpdateAvailable } = setUpUpdate();

    triggerUpdateAvailable();

    jest.advanceTimersByTime(29999);

    closeDialog();

    jest.advanceTimersByTime(30000);

    expect(mockDialog.open).toBeCalledTimes(2);
  });

  it(`shouldn't reprompt user after 30s if dialog is still open`, () => {
    const { mockDialog, triggerUpdateAvailable } = setUpUpdate();

    triggerUpdateAvailable();

    jest.advanceTimersByTime(29999);

    expect(mockDialog.open).toBeCalledTimes(1);

    jest.advanceTimersByTime(30000);

    expect(mockDialog.open).toBeCalledTimes(1);
  });

  /**
   * Use this to test the UpdateEffects.checkForUpdate effect.
   */
  function setUpCheckForUpdate() {
    const utils = setUp();
    observe(utils.updateEffects.checkForUpdate$);
    return utils;
  }

  /**
   * Use this to test the UpdateEffects.update effect.
   */
  function setUpUpdate() {
    const utils = setUp();
    observe(utils.updateEffects.update$);
    return utils;
  }

  /* Set up effects service. */
  function setUp() {
    const mockDialog: jest.Mocked<Pick<MatDialog, 'open'>> = {
      open: jest.fn()
    };
    const mockDialogRef: jest.Mocked<
      Pick<MatDialogRef<unknown>, 'afterClosed'>
    > = {
      afterClosed: jest.fn()
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
      isEnabled: true
    };
    mockSwUpdate.checkForUpdate.mockResolvedValue(true);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        provideUpdateEffects(),
        {
          provide: ApplicationRef,
          useValue: {
            isStable: of(true)
          } as ApplicationRef
        },
        {
          provide: MatDialog,
          useValue: mockDialog
        },
        {
          provide: SwUpdate,
          useValue: mockSwUpdate
        }
      ]
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
          type: 'VERSION_READY'
        } as VersionEvent);
      }
    };
  }
});
