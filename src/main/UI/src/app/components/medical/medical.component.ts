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

  isEditMode: boolean = false;
  editingMedicalId?: number;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.initForm();
    this.fetchMedicalRecords();
  }

  initForm() {
    this.addMedicalForm = new FormGroup({
      vet: new FormControl('', Validators.required),
      notes: new FormControl(''),
      has_restrictions: new FormControl(false),
      last_apt: new FormControl(''),
      next_apt: new FormControl('')
    });
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

  onSaveMedical() {
    if (!this.addMedicalForm.valid) return;

    const formVal = this.addMedicalForm.value;
    const medicalData: Medical = {
      id: this.editingMedicalId,
      vet: formVal.vet,
      notes: formVal.notes,
      has_restrictions: formVal.has_restrictions === true || formVal.has_restrictions === 'true',
      last_apt: formVal.last_apt || undefined,
      next_apt: formVal.next_apt || undefined
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    if (this.isEditMode && this.editingMedicalId) {
      this.httpClient.put<Medical>(`${this.medicalUrl}/${this.editingMedicalId}`, medicalData, options).subscribe(
        res => {
          console.log('Medical record updated:', res);
          this.cancelEdit();
          this.fetchMedicalRecords();
        },
        err => console.error('Error updating medical record', err)
      );
    } else {
      this.httpClient.post<Medical>(this.medicalUrl, medicalData, options).subscribe(
        res => {
          console.log('Medical record added:', res);
          this.cancelEdit();
          this.fetchMedicalRecords();
        },
        err => console.error('Error adding medical record', err)
      );
    }
  }

  onEditMedical(med: Medical) {
    this.isEditMode = true;
    this.editingMedicalId = med.id;
    this.addMedicalForm.patchValue({
      vet: med.vet || '',
      notes: med.notes || '',
      has_restrictions: med.has_restrictions === true,
      last_apt: med.last_apt || '',
      next_apt: med.next_apt || ''
    });
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

  cancelEdit() {
    this.isEditMode = false;
    this.editingMedicalId = undefined;
    this.addMedicalForm.reset({
      vet: '',
      notes: '',
      has_restrictions: false,
      last_apt: '',
      next_apt: ''
    });
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.medicalUrl, { responseType: 'json' });
  }
}
