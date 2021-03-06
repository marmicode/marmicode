import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentfulModule, Query } from '@marmicode/contentful-api';
import { skillFragment, skillFragmentToSkill } from './skill-fragment';
import { Skill } from './skill';

const allSkills = gql`
  ${skillFragment}
  query getAllSkills {
    skillCollection(order: [label_ASC]) {
      items {
        ...SkillFragment
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
  imports: [ContentfulModule],
  providers: [SkillRepository],
})
export class SkillRepositoryModule {}
