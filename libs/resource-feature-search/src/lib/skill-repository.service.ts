import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { GraphQLModule } from './graphql.module';
import { createSkill, Skill } from './skill';

@Injectable()
export class SkillRepository {
  constructor(private _apollo: Apollo) {}

  getSkills(): Observable<Skill[]> {
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
