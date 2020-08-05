import { ApplicationRef } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SwUpdate } from '@angular/service-worker';
import { of, Subject } from 'rxjs';
import { UpdateDialogComponent } from './update-dialog.component';
import { UpdateEffects } from './update.effects';

jest.mock('@angular/material/dialog');

describe('UpdateEffects', () => {
  let updateAvailable$: Subject<unknown>;

  beforeEach(() => {
    updateAvailable$ = new Subject<unknown>();
    return TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [
        {
          provide: ApplicationRef,
          useValue: {
            isStable: of(true),
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn(),
          },
        },
        {
          provide: SwUpdate,
          useValue: {
            activateUpdate: jest.fn(),
            available: updateAvailable$,
            checkForUpdate: jest.fn(),
            isEnabled: true,
          },
        },
      ],
    });
  });

  let matDialog: MatDialog;
  beforeEach(() => (matDialog = TestBed.inject(MatDialog)));

  let updateEffects: UpdateEffects;
  beforeEach(() => (updateEffects = TestBed.inject(UpdateEffects)));

  let swUpdate: SwUpdate;
  beforeEach(() => (swUpdate = TestBed.inject(SwUpdate)));

  it('should check for updates every 30s', fakeAsync(() => {
    const subscription = updateEffects.checkForUpdate$.subscribe();

    tick();

    expect(swUpdate.checkForUpdate).toBeCalledTimes(1);

    tick(29999);

    expect(swUpdate.checkForUpdate).toBeCalledTimes(1);

    tick(30000);

    expect(swUpdate.checkForUpdate).toBeCalledTimes(2);

    subscription.unsubscribe();
  }));

  it('should prompt user for reload', fakeAsync(() => {
    const subscription = updateEffects.update$.subscribe();

    expect(matDialog.open).not.toBeCalled();

    /* Trigger update. */
    updateAvailable$.next();

    tick();

    /* Check prompt is called. */
    expect(matDialog.open).toBeCalledTimes(1);
    expect(matDialog.open).toBeCalledWith(UpdateDialogComponent);
    expect(swUpdate.activateUpdate).not.toBeCalled();

    subscription.unsubscribe();
  }));
});
