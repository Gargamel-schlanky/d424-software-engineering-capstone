import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from './services/search.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fetch! Animal Rescue Helper';
  searchQuery: string = '';
  isLoggedIn$: Observable<boolean>;

  constructor(
    private searchService: SearchService,
    public authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit() {
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }

  onSearchChange(query: string) {
    this.searchService.setSearchQuery(query);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchService.clearSearchQuery();
  }

  logout() {
    this.authService.logout();
  }
}
