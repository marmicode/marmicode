import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { ResourceSearchFormComponent } from './resource-search-form.component';
import { createSkill } from './skill';
import { SkillRepository } from './skill-repository.service';

describe('ResourceSearchFormComponent', () => {
  it('should show all options', async () => {
    const { component } = await configure();
    expect(
      await component.filteredSkills$.pipe(take(1)).toPromise()
    ).toHaveLength(4);
  });

  it('should filter options', async () => {
    const { component } = await configure();
    component.skillControl.setValue('tes');
    expect(await component.filteredSkills$.pipe(take(1)).toPromise()).toEqual([
      createSkill({
        id: 'xxx',
        label: 'Angular Testing',
        slug: 'angular-testing',
      }),
      createSkill({
        id: 'zzz',
        label: 'React Testing',
        slug: 'react-testing',
      }),
    ]);
  });

  it('should return an empty list if a skill is selected', async () => {
    const { component } = await configure();
    component.skillControl.setValue(
      createSkill({
        id: 'xxx',
        label: 'Angular Testing',
        slug: 'angular-testing',
      })
    );
    expect(await component.filteredSkills$.pipe(take(1)).toPromise()).toEqual(
      []
    );
  });

  it('should not crash if skill is null', fakeAsync(async () => {
    const { component, router } = await configure();
    component.skillControl.setValue(null);
    tick();
    expect(router.navigate).toBeCalledWith(['/', 'learn', 'everything']);
  }));

  it('should sync route with form value on next tick', fakeAsync(async () => {
    const { component, resourceSearchFacade } = await configure();

    resourceSearchFacade.selectedSkillSlug$ = of('angular-testing');

    jest.spyOn(component.skillControl, 'reset');

    component.ngOnInit();

    expect(component.skillControl.reset).toBeCalledTimes(0);

    tick();

    expect(component.skillControl.reset).toBeCalledTimes(1);
    expect(component.skillControl.reset).toBeCalledWith({
      id: 'xxx',
      label: 'Angular Testing',
      slug: 'angular-testing',
    });
  }));

  /**
   * This is critical otherwise, user will not be able to navigate
   * to another route.
   */
  it('should ignore undefined skill slug', fakeAsync(async () => {
    const { component, resourceSearchFacade } = await configure();

    resourceSearchFacade.selectedSkillSlug$ = of(undefined);

    jest.spyOn(component.skillControl, 'reset');

    component.ngOnInit();

    tick();

    expect(component.skillControl.reset).toBeCalledTimes(0);
  }));

  async function configure() {
    await TestBed.configureTestingModule({
      declarations: [ResourceSearchFormComponent],
      imports: [MatAutocompleteModule],
      providers: [
        {
          provide: ResourceSearchFacade,
          useValue: {
            selectedSkillSlug$: EMPTY,
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        {
          provide: SkillRepository,
          useValue: {
            getSkills: jest.fn().mockReturnValue(
              of([
                createSkill({
                  id: 'www',
                  /* Just to make sure this doesn't pop out when typing `tes`. */
                  label: 'States',
                  slug: 'state',
                }),
                createSkill({
                  id: 'xxx',
                  label: 'Angular Testing',
                  slug: 'angular-testing',
                }),
                createSkill({
                  id: 'yyy',
                  label: 'Angular CLI',
                  slug: 'angular-cli',
                }),
                createSkill({
                  id: 'zzz',
                  label: 'React Testing',
                  slug: 'react-testing',
                }),
              ])
            ),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(ResourceSearchFormComponent);

    fixture.detectChanges();

    return {
      fixture,
      component: fixture.componentInstance,
      resourceSearchFacade: TestBed.inject(ResourceSearchFacade),
      router: TestBed.inject(Router),
    };
  }
});
