import { Injectable } from '@angular/core';
import { Public } from '@marmicode/shared/utils';
import { Observable, of } from 'rxjs';
import { Resource } from './resource';
import { ResourceRepository } from './resource-repository.service';

/**
 * In-memory `ResourceRepository`: resources come back in the order they were configured.
 */
@Injectable()
export class ResourceRepositoryFake implements Public<ResourceRepository> {
  private _resources: Resource[] = [];

  configure({ resources }: { resources: Resource[] }) {
    this._resources = resources;
  }

  getResources(): Observable<Resource[]> {
    return of(this._resources);
  }
}
