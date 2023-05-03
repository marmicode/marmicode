import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PushPipe } from '@rx-angular/template/push';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { ResourceSearchFormComponent } from './resource-search-form.component';
import { createSkill } from './skill';
import { SkillRepository } from './skill-repository.service';

describe('ResourceSearchFormComponent', () => {
  let component: ResourceSearchFormComponent;
  let fixture: ComponentFixture<ResourceSearchFormComponent>;
  let selectedSkillSlug$: BehaviorSubject<string>;

  beforeEach(async () => {
    selectedSkillSlug$ = new BehaviorSubject<string>(undefined);

    await TestBed.configureTestingModule({
      declarations: [ResourceSearchFormComponent],
      imports: [MatAutocompleteModule, PushPipe],
      providers: [
        {
          provide: ResourceSearchFacade,
          useValue: {
            selectedSkillSlug$,
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
  });

  let router: Router;
  beforeEach(() => (router = TestBed.inject(Router)));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSearchFormComponent);
    component = fixture.componentInstance;
  });

  it('should show all options', async () => {
    expect(
      await component.filteredSkills$.pipe(take(1)).toPromise()
    ).toHaveLength(4);
  });

  it('should filter options', async () => {
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

  it('should not crash if skill is null', () => {
    selectedSkillSlug$.next('angular-testing');

    fixture.detectChanges();

    component.skillControl.setValue(null);

    expect(router.navigate).toBeCalledWith(['/', 'learn', 'everything']);
  });

  /**
   * This is critical as it avoids the infinite loop.
   */
  it('should not navigate to route when form is reset due to route change', () => {
    fixture.detectChanges();

    /* Trigger route change. */
    selectedSkillSlug$.next('angular-testing');

    expect(router.navigate).not.toBeCalled();
  });

  /**
   * This is critical as it avoids the infinite loop.
   */
  it('should not navigate to route when form is reset due to route change to /learn/everything', () => {
    fixture.detectChanges();

    /* Trigger route change to /learn/everything. */
    selectedSkillSlug$.next('everything');

    expect(router.navigate).not.toBeCalled();
  });
});
