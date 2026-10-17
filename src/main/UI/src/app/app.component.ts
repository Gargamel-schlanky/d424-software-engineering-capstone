import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fetch! Animal Rescue Helper';
  searchQuery: string = '';

  constructor(private searchService: SearchService) {}

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
}
