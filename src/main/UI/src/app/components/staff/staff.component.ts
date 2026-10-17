import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../../models';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['../../app.component.css']
})
export class StaffComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private getUrl: string = this.baseURL + '/staff';

  staffMembers: Staff[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchStaff();
  }

  fetchStaff() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.staffMembers = Array.isArray(res) ? res : (Object.values(res)[0] as Staff[]) || [];
        }
      },
      err => console.log(err)
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.getUrl, { responseType: 'json' });
  }
}
