import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLModule } from './graphql.module';
import { skillFragment } from './graphql/skill-fragment';
import { createSkill, Skill } from './skill';

const allSkills = gql`
  ${skillFragment}
  query Skills {
    skillCollection(order: [label_ASC]) {
      items {
        ...Skill
      }
    }
  }
`;

@Injectable()
export class SkillRepository {
  constructor(private _apollo: Apollo) {}

  getSkills(): Observable<Skill[]> {
    // this._apollo
    //   .query({
    //     query: allSkills,
    //   })
    //   .subscribe(console.log);
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
