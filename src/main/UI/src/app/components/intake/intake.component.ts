import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Intake } from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['../../app.component.css']
})
export class IntakeComponent implements OnInit, OnDestroy {

  private baseURL: string = '';
  private getIntakesUrl: string = this.baseURL + '/intake/animal';

  intakes: Intake[] = [];
  filteredIntakes: Intake[] = [];
  searchSubscription?: Subscription;

  constructor(
    private httpClient: HttpClient,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.fetchIntakes();

    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.applyFilter(query);
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  fetchIntakes() {
    this.httpClient.get<any>(this.getIntakesUrl).subscribe(
      res => {
        if (res) {
          this.intakes = Array.isArray(res) ? res : (Object.values(res)[0] as Intake[]) || [];
          this.applyFilter(this.searchService.currentQuery);
        }
      },
      err => console.log('Error fetching intakes', err)
    );
  }

  applyFilter(query: string) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.filteredIntakes = [...this.intakes];
    } else {
      this.filteredIntakes = this.intakes.filter(i => {
        const idMatch = String(i.id || '').toLowerCase().includes(q);
        const dateMatch = String(i.intake_date || '').toLowerCase().includes(q);
        const typeMatch = String(i.TYPE || '').toLowerCase().includes(q);
        const animalMatch = i.animal && String(i.animal.name || '').toLowerCase().includes(q);
        const staffMatch = i.intake_staff_member && String(i.intake_staff_member.name || '').toLowerCase().includes(q);
        return idMatch || dateMatch || typeMatch || animalMatch || staffMatch;
      });
    }
  }

  onDeleteIntake(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this intake record?')) {
      this.httpClient.delete(`${this.getIntakesUrl}/${id}`).subscribe(
        res => {
          console.log('Intake deleted', id);
          this.fetchIntakes();
        },
        err => console.error('Error deleting intake', err)
      );
    }
  }
}
