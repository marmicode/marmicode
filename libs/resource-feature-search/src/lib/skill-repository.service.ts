import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { GraphQLModule } from './graphql.module';
import { createSkill, Skill } from './skill';

const allSkills = gql`
  query Skills {
    skillCollection(order: [label_ASC]) {
      items {
        sys {
          id
        }
        label
        slug
      }
    }
  }
`;

@Injectable()
export class SkillRepository {
  constructor(private _apollo: Apollo) {}

  getSkills(): Observable<Skill[]> {
    this._apollo
      .query({
        query: allSkills,
      })
      .subscribe(console.log);
    return of([
      createSkill({
        id: 'test',
        label: 'Test',
        slug: 'test',
      }),
      createSkill({
        id: 'test',
        label: 'Test 2',
        slug: 'test 2',
      }),
    ]);
  }
}

@NgModule({
  imports: [GraphQLModule],
  providers: [SkillRepository],
})
export class SkillRepositoryModule {}
