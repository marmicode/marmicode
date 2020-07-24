import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { readAll } from '@nrwl/angular/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResourceSearchFormComponent } from './resource-search-form.component';
import { createSkill } from './skill';
import { SkillRepository } from './skill-repository.service';

describe('ResourceSearchFormComponent', () => {
  let component: ResourceSearchFormComponent;
  let fixture: ComponentFixture<ResourceSearchFormComponent>;

  beforeEach(async () =>
    TestBed.configureTestingModule({
      declarations: [ResourceSearchFormComponent],
      imports: [MatAutocompleteModule],
      providers: [
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
    }).compileComponents()
  );

  let skillRepository: SkillRepository;
  beforeEach(() => (skillRepository = TestBed.inject(SkillRepository)));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show all options', async () => {
    expect(await component.skills$.pipe(take(1)).toPromise()).toHaveLength(4);
  });

  it('should filter options', async () => {
    component.skillControl.patchValue('tes');
    expect(await component.skills$.pipe(take(1)).toPromise()).toEqual([
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
});
