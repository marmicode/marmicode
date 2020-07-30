import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceSearchComponent } from '@marmicode/resource-feature-search';
import { EMPTY, of } from 'rxjs';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { ResourceRepository } from './resource-repository.service';

describe('ResourceSearchComponent', () => {
  let component: ResourceSearchComponent;
  let fixture: ComponentFixture<ResourceSearchComponent>;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [ResourceSearchComponent],
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
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  let resourceRepository: ResourceRepository;
  beforeEach(() => (resourceRepository = TestBed.inject(ResourceRepository)));

  let resourceSearchFacade: ResourceSearchFacade;
  beforeEach(
    () => (resourceSearchFacade = TestBed.inject(ResourceSearchFacade))
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('🚧 should search for all resources if skillSlug is null', () => {
    /* Suppose the skillSlug param is null. */
    jest
      .spyOn(resourceSearchFacade, 'selectedSkillSlug$', 'get')
      .mockReturnValue(of(null));
  });
});
