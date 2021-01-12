import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceSearchPageComponent } from './resource-search-page.component';
import { Subject } from 'rxjs';
import { TransferStateAdapter } from '@marmicode/shared-utils';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { ResourceRepository } from './resource-repository.service';

describe('ResourceSearchComponent', () => {
  let component: ResourceSearchPageComponent;
  let fixture: ComponentFixture<ResourceSearchPageComponent>;
  let selectedSkillSlug$: Subject<string>;

  beforeEach(async () => {
    selectedSkillSlug$ = new Subject<string>();

    return await TestBed.configureTestingModule({
      declarations: [ResourceSearchPageComponent],
      providers: [
        {
          provide: ResourceRepository,
          useValue: {
            getResources: jest.fn(),
            getResourcesBySkillSlug: jest.fn(),
          },
        },
        {
          provide: ResourceSearchFacade,
          useValue: {
            selectedSkillSlug$,
          },
        },
        {
          provide: TransferStateAdapter,
          useValue: {
            hasKey: jest.fn().mockReturnValue(false),
            isPrerendering: jest.fn().mockReturnValue(false),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  let resourceRepository: ResourceRepository;
  beforeEach(() => (resourceRepository = TestBed.inject(ResourceRepository)));

  let resourceSearchFacade: ResourceSearchFacade;
  beforeEach(
    () => (resourceSearchFacade = TestBed.inject(ResourceSearchFacade))
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not trigger any query until skillSlug parameter is available', () => {
    expect(resourceRepository.getResources).toBeCalledTimes(0);
    expect(resourceRepository.getResourcesBySkillSlug).toBeCalledTimes(0);
  });

  /* This fixes a bug where `getResourcesBySkillSlug` was called with
   * an undefined value. This happens when user navigates to another route
   * and ngrx router emits the null value before destroying the component. */
  it('should search for all resources if skillSlug is null', () => {
    /* Suppose the skillSlug param is null. */
    selectedSkillSlug$.next(null);

    expect(resourceRepository.getResources).toBeCalledTimes(1);
    expect(resourceRepository.getResourcesBySkillSlug).toBeCalledTimes(0);
  });
});
