import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../../models';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['../../app.component.css']
})
export class StaffFormComponent implements OnInit {

  private baseURL: string = '';
  private staffUrl: string = this.baseURL + '/staff';

  staffForm!: FormGroup;
  isEditMode: boolean = false;
  staffId?: number;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.staffForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl(''),
      position: new FormControl(''),
      hire_date: new FormControl(''),
      on_call_duty: new FormControl(false)
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.staffId = Number(idParam);
      this.loadStaffMember(this.staffId);
    }
  }

  loadStaffMember(id: number) {
    this.httpClient.get<Staff>(`${this.staffUrl}/${id}`).subscribe(
      res => {
        if (res) {
          this.staffForm.patchValue({
            name: res.name || '',
            phone: res.phone || '',
            position: res.position || '',
            hire_date: res.hire_date || '',
            on_call_duty: res.on_call_duty === true
          });
        }
      },
      err => console.error('Error loading staff member', err)
    );
  }

  onSubmit() {
    if (!this.staffForm.valid) return;

    const formVal = this.staffForm.value;
    const staffData: Staff = {
      id: this.staffId,
      name: formVal.name,
      phone: formVal.phone,
      position: formVal.position,
      hire_date: formVal.hire_date || undefined,
      on_call_duty: formVal.on_call_duty === true || formVal.on_call_duty === 'true'
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    if (this.isEditMode && this.staffId) {
      this.httpClient.put<Staff>(`${this.staffUrl}/${this.staffId}`, staffData, options).subscribe(
        res => {
          console.log('Staff member updated:', res);
          this.router.navigate(['/staff']);
        },
        err => console.error('Error updating staff member', err)
      );
    } else {
      this.httpClient.post<Staff>(this.staffUrl, staffData, options).subscribe(
        res => {
          console.log('Staff member created:', res);
          this.router.navigate(['/staff']);
        },
        err => console.error('Error creating staff member', err)
      );
    }
  }

  onCancel() {
    this.router.navigate(['/staff']);
  }
}
