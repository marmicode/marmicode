import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLModule } from './graphql.module';
import { Query } from './graphql/schema';
import { skillFragment, skillFragmentToSkill } from './graphql/skill-fragment';
import { Skill } from './skill';

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
    return this._apollo
      .query<Query>({
        query: allSkills,
      })
      .pipe(
        map(({ data }) => data.skillCollection.items.map(skillFragmentToSkill))
      );
  }
}

@NgModule({
  imports: [GraphQLModule],
  providers: [SkillRepository],
})
export class SkillRepositoryModule {}
