import { TestBed } from '@angular/core/testing';
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

  describe('when prerendering', () => {
    beforeEach(() => {
      (adapter.isPrerendering as jest.Mock).mockReturnValue(false);
    });

    xit('🚧 should update state transfer', () => {});
  });
});
