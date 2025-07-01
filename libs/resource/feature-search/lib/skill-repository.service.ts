import { inject, Injectable, NgModule } from '@angular/core';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ContentfulClient,
  Query,
  provideContentfulClient,
} from '@marmicode/contentful/infra';
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
  private _contentfulClient = inject(ContentfulClient);

  getSkills(): Observable<Skill[]> {
    return this._contentfulClient
      .query<Query>({
        query: allSkills,
      })
      .pipe(
        map(({ data }) => data.skillCollection.items.map(skillFragmentToSkill)),
      );
  }
}

@NgModule({
  providers: [SkillRepository, provideContentfulClient()],
})
export class SkillRepositoryModule {}
