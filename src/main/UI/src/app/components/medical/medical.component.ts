import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Medical } from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['../../app.component.css']
})
export class MedicalComponent implements OnInit, OnDestroy {

  private baseURL: string = '';
  private medicalUrl: string = this.baseURL + '/medical';

  medicals: Medical[] = [];
  filteredMedicals: Medical[] = [];
  searchSubscription?: Subscription;

  constructor(
    private httpClient: HttpClient,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.fetchMedicalRecords();

    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.applyFilter(query);
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  fetchMedicalRecords() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.medicals = Array.isArray(res) ? res : (Object.values(res)[0] as Medical[]) || [];
          this.applyFilter(this.searchService.currentQuery);
        }
      },
      err => console.log('Error fetching medical records', err)
    );
  }

  applyFilter(query: string) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.filteredMedicals = [...this.medicals];
    } else {
      this.filteredMedicals = this.medicals.filter(m => {
        const idMatch = String(m.id || '').toLowerCase().includes(q);
        const vetMatch = String(m.vet || '').toLowerCase().includes(q);
        const notesMatch = String(m.notes || '').toLowerCase().includes(q);
        const lastAptMatch = String(m.last_apt || '').toLowerCase().includes(q);
        const nextAptMatch = String(m.next_apt || '').toLowerCase().includes(q);
        return idMatch || vetMatch || notesMatch || lastAptMatch || nextAptMatch;
      });
    }
  }

  onDeleteMedical(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this medical record?')) {
      this.httpClient.delete(`${this.medicalUrl}/${id}`).subscribe(
        res => {
          console.log('Medical record deleted', id);
          this.fetchMedicalRecords();
        },
        err => console.error('Error deleting medical record', err)
      );
    }
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.medicalUrl, { responseType: 'json' });
  }
}
