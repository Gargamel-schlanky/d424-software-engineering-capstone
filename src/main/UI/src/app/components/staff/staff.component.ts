import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Staff } from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['../../app.component.css']
})
export class StaffComponent implements OnInit, OnDestroy {

  private baseURL: string = '';
  private getUrl: string = this.baseURL + '/staff';

  staffMembers: Staff[] = [];
  filteredStaff: Staff[] = [];
  searchSubscription?: Subscription;

  constructor(
    private httpClient: HttpClient,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.fetchStaff();

    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.applyFilter(query);
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  fetchStaff() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.staffMembers = Array.isArray(res) ? res : (Object.values(res)[0] as Staff[]) || [];
          this.applyFilter(this.searchService.currentQuery);
        }
      },
      err => console.log('Error fetching staff', err)
    );
  }

  applyFilter(query: string) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.filteredStaff = [...this.staffMembers];
    } else {
      this.filteredStaff = this.staffMembers.filter(s => {
        const idMatch = String(s.id || '').toLowerCase().includes(q);
        const nameMatch = String(s.name || '').toLowerCase().includes(q);
        const phoneMatch = String(s.phone || '').toLowerCase().includes(q);
        const positionMatch = String(s.position || '').toLowerCase().includes(q);
        const hireDateMatch = String(s.hire_date || '').toLowerCase().includes(q);
        return idMatch || nameMatch || phoneMatch || positionMatch || hireDateMatch;
      });
    }
  }

  onDeleteStaff(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.httpClient.delete(`${this.getUrl}/${id}`).subscribe(
        res => {
          console.log('Staff member deleted', id);
          this.fetchStaff();
        },
        err => console.error('Error deleting staff member', err)
      );
    }
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.getUrl, { responseType: 'json' });
  }
}
