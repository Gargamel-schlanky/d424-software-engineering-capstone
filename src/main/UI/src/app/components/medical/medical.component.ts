import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medical } from '../../models';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['../../app.component.css']
})
export class MedicalComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private getUrl: string = this.baseURL + '/medical';

  medicals: Medical[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchMedicalRecords();
  }

  fetchMedicalRecords() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.medicals = Array.isArray(res) ? res : (Object.values(res)[0] as Medical[]) || [];
        }
      },
      err => console.log('Error fetching medical records', err)
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.getUrl, { responseType: 'json' });
  }
}
