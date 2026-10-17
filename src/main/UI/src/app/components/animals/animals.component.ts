import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Animal } from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['../../app.component.css']
})
export class AnimalsComponent implements OnInit, OnDestroy {

  private baseURL: string = 'http://localhost:8080';
  private animalsUrl: string = this.baseURL + '/animals';

  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];
  searchSubscription?: Subscription;

  constructor(
    private httpClient: HttpClient,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.fetchAnimals();

    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.filterAnimals(query);
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  fetchAnimals() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.animals = Array.isArray(res) ? res : (Object.values(res)[0] as Animal[]) || [];
          this.filterAnimals(this.searchService.currentQuery);
        }
      },
      err => console.log('Error fetching animals', err)
    );
  }

  filterAnimals(query?: string) {
    const filterText = (query !== undefined ? query : this.searchService.currentQuery || '').toLowerCase().trim();
    if (!filterText) {
      this.filteredAnimals = [...this.animals];
    } else {
      this.filteredAnimals = this.animals.filter(a => {
        const idMatch = String(a.id || '').toLowerCase().includes(filterText);
        const nameMatch = String(a.name || '').toLowerCase().includes(filterText);
        const ageMatch = String(a.age || '').toLowerCase().includes(filterText);
        const descMatch = String(a.description || '').toLowerCase().includes(filterText);
        return idMatch || nameMatch || ageMatch || descMatch;
      });
    }
  }

  onDeleteAnimal(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this animal record?')) {
      this.httpClient.delete(`${this.animalsUrl}/${id}`).subscribe(
        res => {
          console.log('Animal deleted', id);
          this.fetchAnimals();
        },
        err => console.error('Error deleting animal', err)
      );
    }
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.animalsUrl, { responseType: 'json' });
  }
}
