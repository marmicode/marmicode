import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WipService {
  isWip() {
    return localStorage.getItem('wip') === 'true';
  }
}
