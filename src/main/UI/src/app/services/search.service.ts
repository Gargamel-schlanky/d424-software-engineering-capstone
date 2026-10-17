import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query || '');
  }

  clearSearchQuery() {
    this.searchQuerySubject.next('');
  }

  get currentQuery(): string {
    return this.searchQuerySubject.getValue();
  }
}
