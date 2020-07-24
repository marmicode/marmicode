import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
      providers: [
        {
          provide: SkillRepository,
          useValue: {
            getSkills: jest.fn().mockReturnValue(
              of([
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    expect(await component.skills$.pipe(take(1)).toPromise()).toEqual([
      [
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
      ],
    ]);
  });

  it('should filter options', () => {
    component.skillControl.patchValue('test');
    component
      .expect(await component.skills$.pipe(take(2)).toPromise())
      .toEqual([
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
