import { ApplicationRef } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { EMPTY, of } from 'rxjs';
import { UpdateEffects } from './update.effects';

describe('UpdateEffects', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApplicationRef,
          useValue: {
            isStable: of(true),
          },
        },
        {
          provide: SwUpdate,
          useValue: {
            available: EMPTY,
            checkForUpdate: jest.fn(),
            isEnabled: true,
          },
        },
      ],
    })
  );

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
});
