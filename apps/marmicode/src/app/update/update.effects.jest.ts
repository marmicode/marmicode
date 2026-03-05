import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SwUpdate, VersionEvent } from '@angular/service-worker';

import { describe, expect, it, jest } from '@jest/globals';
import { observe } from '@marmicode/shared/testing';
import { Subject } from 'rxjs';
import { UpdateDialogComponent } from './update-dialog.component';
import { provideUpdateEffects, UpdateEffects } from './update.effects';

jest.mock('@angular/material/dialog');

jest.useFakeTimers();

describe('UpdateEffects', () => {
  it('should check for updates every 30s', async () => {
    const { mockSwUpdate, updateEffects } = setUp();

    using _ = await observe(updateEffects.checkForUpdate$);

    jest.advanceTimersToNextTimer();

    expect(mockSwUpdate.checkForUpdate).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(29999);

    expect(mockSwUpdate.checkForUpdate).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(30000);

    expect(mockSwUpdate.checkForUpdate).toHaveBeenCalledTimes(2);
  });

  it('should prompt user for reload', async () => {
    const { mockDialog, mockSwUpdate, updateEffects, triggerUpdateAvailable } =
      setUp();

    using _ = await observe(updateEffects.update$);

    expect(mockDialog.open).not.toHaveBeenCalled();

    triggerUpdateAvailable();

    jest.advanceTimersToNextTimer();

    /* Check prompt is called. */
    expect(mockDialog.open).toHaveBeenCalledTimes(1);
    expect(mockDialog.open).toHaveBeenCalledWith(UpdateDialogComponent, {
      backdropClass: 'mc-overlay-backdrop',
    });
    expect(mockSwUpdate.activateUpdate).not.toHaveBeenCalled();
  });

  it('should reprompt user after 30s', async () => {
    const { closeDialog, mockDialog, updateEffects, triggerUpdateAvailable } =
      setUp();

    using _ = await observe(updateEffects.update$);

    triggerUpdateAvailable();

    jest.advanceTimersByTime(29999);

    closeDialog();

    jest.advanceTimersByTime(30000);

    expect(mockDialog.open).toHaveBeenCalledTimes(2);
  });

  it(`shouldn't reprompt user after 30s if dialog is still open`, async () => {
    const { mockDialog, updateEffects, triggerUpdateAvailable } = setUp();

    using _ = await observe(updateEffects.update$);

    triggerUpdateAvailable();

    jest.advanceTimersByTime(29999);

    expect(mockDialog.open).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(30000);

    expect(mockDialog.open).toHaveBeenCalledTimes(1);
  });

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
      Pick<SwUpdate, 'activateUpdate' | 'checkForUpdate' | 'isEnabled'>
    > &
      Pick<SwUpdate, 'versionUpdates'> = {
      activateUpdate: jest.fn(),
      checkForUpdate: jest.fn(),
      versionUpdates: versionUpdates$,
      isEnabled: true,
    };
    mockSwUpdate.checkForUpdate.mockResolvedValue(true);

    TestBed.configureTestingModule({
      providers: [
        provideUpdateEffects(),
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
