import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Medical } from '../../models';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['../../app.component.css']
})
export class MedicalFormComponent implements OnInit {

  private baseURL: string = '';
  private medicalUrl: string = this.baseURL + '/medical';

  addMedicalForm!: FormGroup;
  isEditMode: boolean = false;
  medicalId?: number;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.addMedicalForm = new FormGroup({
      vet: new FormControl('', Validators.required),
      notes: new FormControl(''),
      has_restrictions: new FormControl(false),
      last_apt: new FormControl(''),
      next_apt: new FormControl('')
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.medicalId = Number(idParam);
      this.loadMedical(this.medicalId);
    }
  }

  loadMedical(id: number) {
    this.httpClient.get<Medical>(`${this.medicalUrl}/${id}`).subscribe(
      res => {
        if (res) {
          this.addMedicalForm.patchValue({
            vet: res.vet || '',
            notes: res.notes || '',
            has_restrictions: res.has_restrictions === true,
            last_apt: res.last_apt || '',
            next_apt: res.next_apt || ''
          });
        }
      },
      err => console.error('Error loading medical record', err)
    );
  }

  onSubmit() {
    if (!this.addMedicalForm.valid) return;

    const formVal = this.addMedicalForm.value;
    const medicalData: Medical = {
      id: this.medicalId,
      vet: formVal.vet,
      notes: formVal.notes,
      has_restrictions: formVal.has_restrictions === true || formVal.has_restrictions === 'true',
      last_apt: formVal.last_apt || undefined,
      next_apt: formVal.next_apt || undefined
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    if (this.isEditMode && this.medicalId) {
      this.httpClient.put<Medical>(`${this.medicalUrl}/${this.medicalId}`, medicalData, options).subscribe(
        res => {
          console.log('Medical record updated:', res);
          this.router.navigate(['/medical']);
        },
        err => console.error('Error updating medical record', err)
      );
    } else {
      this.httpClient.post<Medical>(this.medicalUrl, medicalData, options).subscribe(
        res => {
          console.log('Medical record added:', res);
          this.router.navigate(['/medical']);
        },
        err => console.error('Error adding medical record', err)
      );
    }
  }

  onCancel() {
    this.router.navigate(['/medical']);
  }
}
