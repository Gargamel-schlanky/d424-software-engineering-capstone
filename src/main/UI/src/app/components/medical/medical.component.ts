import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medical } from '../../models';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['../../app.component.css']
})
export class MedicalComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private medicalUrl: string = this.baseURL + '/medical';

  addMedicalForm!: FormGroup;
  medicals: Medical[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.addMedicalForm = new FormGroup({
      vet: new FormControl('', Validators.required),
      notes: new FormControl(''),
      has_restrictions: new FormControl(false),
      last_apt: new FormControl(''),
      next_apt: new FormControl('')
    });

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

  onAddMedical() {
    if (!this.addMedicalForm.valid) return;

    const formVal = this.addMedicalForm.value;
    const newMedical: Medical = {
      vet: formVal.vet,
      notes: formVal.notes,
      has_restrictions: formVal.has_restrictions === true || formVal.has_restrictions === 'true',
      last_apt: formVal.last_apt || undefined,
      next_apt: formVal.next_apt || undefined
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    this.httpClient.post<Medical>(this.medicalUrl, newMedical, options).subscribe(
      res => {
        console.log('Medical provider successfully added:', res);
        this.addMedicalForm.reset({
          vet: '',
          notes: '',
          has_restrictions: false,
          last_apt: '',
          next_apt: ''
        });
        this.fetchMedicalRecords();
      },
      err => console.error('Error adding medical record', err)
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.medicalUrl, { responseType: 'json' });
  }
}
