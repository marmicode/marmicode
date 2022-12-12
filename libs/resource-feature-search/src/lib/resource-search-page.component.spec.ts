import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { describe, expect, it, jest } from '@jest/globals';
import { TransferStateAdapter } from '@marmicode/shared-utils';
import { PushModule } from '@rx-angular/template';
import { EMPTY, Subject } from 'rxjs';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { ResourceRepository } from './resource-repository.service';
import { ResourceSearchPageComponent } from './resource-search-page.component';

describe('ResourceSearchComponent', () => {
  it('should not trigger any query until skillSlug parameter is available', () => {
    const { resourceRepository } = createComponent();
    expect(resourceRepository.getResources).toBeCalledTimes(0);
    expect(resourceRepository.getResourcesBySkillSlug).toBeCalledTimes(0);
  });

  /* This fixes a bug where `getResourcesBySkillSlug` was called with
   * an undefined value. This happens when user navigates to another route
   * and ngrx router emits the null value before destroying the component. */
  it('should search for all resources if skillSlug is null', () => {
    /* Suppose the skillSlug param is null. */
    const { resourceRepository, setSkillSlug } = createComponent();
    setSkillSlug(null);

    expect(resourceRepository.getResources).toBeCalledTimes(1);
    expect(resourceRepository.getResourcesBySkillSlug).toBeCalledTimes(0);
  });

  function createComponent() {
    const mockRepo: jest.Mocked<
      Pick<ResourceRepository, 'getResources' | 'getResourcesBySkillSlug'>
    > = {
      getResources: jest.fn(),
      getResourcesBySkillSlug: jest.fn(),
    };
    mockRepo.getResources.mockReturnValue(EMPTY);
    mockRepo.getResourcesBySkillSlug.mockReturnValue(EMPTY);

    const mockTransferStateAdapter: jest.Mocked<
      Pick<TransferStateAdapter, 'hasKey' | 'isPrerendering'>
    > = {
      isPrerendering: jest.fn(),
      hasKey: jest.fn(),
    };
    mockTransferStateAdapter.isPrerendering.mockReturnValue(false);
    mockTransferStateAdapter.hasKey.mockReturnValue(false);

    const selectedSkillSlug$ = new Subject<string>();

    TestBed.configureTestingModule({
      declarations: [ResourceSearchPageComponent],
      imports: [PushModule],
      providers: [
        {
          provide: ResourceRepository,
          useValue: mockRepo,
        },
        {
          provide: ResourceSearchFacade,
          useValue: {
            selectedSkillSlug$,
          } as Partial<ResourceSearchFacade>,
        },
        {
          provide: TransferStateAdapter,
          useValue: mockTransferStateAdapter,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    const fixture = TestBed.createComponent(ResourceSearchPageComponent);
    fixture.detectChanges();

    return {
      resourceRepository: TestBed.inject(ResourceRepository),
      setSkillSlug(skillSlug: string) {
        selectedSkillSlug$.next(skillSlug);
      },
    };
  }
});
