import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransferStateAdapter } from './transfer-state-adapter.service';
import { TransferStateHelper } from './transfer-state-helper.service';

describe('transferStateHelper', () => {
  beforeEach(async () => {
    return TestBed.configureTestingModule({
      providers: [
        {
          provide: TransferStateAdapter,
          useValue: {
            get: jest.fn(),
            hasKey: jest.fn(),
            set: jest.fn(),
            isPrerendering: jest.fn(),
          },
        },
      ],
    });
  });

  let adapter: TransferStateAdapter;
  beforeEach(() => (adapter = TestBed.inject(TransferStateAdapter)));

  let helper: TransferStateHelper;
  beforeEach(() => (helper = TestBed.inject(TransferStateHelper)));

  let observer: jest.Mock;
  beforeEach(() => (observer = jest.fn()));

  describe('when prerendering', () => {
    beforeEach(() => {
      (adapter.isPrerendering as jest.Mock).mockReturnValue(true);
    });

    it('should update state transfer', () => {
      const source$ = of(42);

      source$.pipe(helper.transfer('theAnswer')).subscribe(observer);

      expect(observer).toBeCalledTimes(1);
      expect(observer).toBeCalledWith(42);
      expect(adapter.set).toBeCalledWith('theAnswer', 42);
    });
  });

  describe('on browser', () => {
    beforeEach(() => {
      (adapter.isPrerendering as jest.Mock).mockReturnValue(false);
    });

    it.todo('🚧 should read state');
  });
});
