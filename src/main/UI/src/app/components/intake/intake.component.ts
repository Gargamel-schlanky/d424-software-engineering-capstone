import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Animal, Animal_type, Intake, Staff } from '../../models';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['../../app.component.css']
})
export class IntakeComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private getIntakesUrl: string = this.baseURL + '/intake/animal';
  private postIntakeUrl: string = this.baseURL + '/intake/animal';
  private getAnimalsUrl: string = this.baseURL + '/animals';
  private getStaffUrl: string = this.baseURL + '/staff';

  animalIntake!: FormGroup;
  intakes: Intake[] = [];
  animals: Animal[] = [];
  staffList: Staff[] = [];

  isEditMode: boolean = false;
  editingIntakeId?: number;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.initForm();
    this.fetchIntakes();
    this.fetchAnimals();
    this.fetchStaff();
  }

  initForm() {
    this.animalIntake = new FormGroup({
      intake_date: new FormControl('', Validators.required),
      TYPE: new FormControl(Animal_type.DOG, Validators.required),
      needs_medical: new FormControl(false),
      animal_id: new FormControl(''),
      staff_id: new FormControl('')
    });
  }

  fetchIntakes() {
    this.httpClient.get<any>(this.getIntakesUrl).subscribe(
      res => {
        if (res) {
          this.intakes = Array.isArray(res) ? res : (Object.values(res)[0] as Intake[]) || [];
        }
      },
      err => console.log('Error fetching intakes', err)
    );
  }

  fetchAnimals() {
    this.httpClient.get<any>(this.getAnimalsUrl).subscribe(
      res => {
        if (res) {
          this.animals = Array.isArray(res) ? res : (Object.values(res)[0] as Animal[]) || [];
        }
      },
      err => console.log('Error fetching animals', err)
    );
  }

  fetchStaff() {
    this.httpClient.get<any>(this.getStaffUrl).subscribe(
      res => {
        if (res) {
          this.staffList = Array.isArray(res) ? res : (Object.values(res)[0] as Staff[]) || [];
        }
      },
      err => console.log('Error fetching staff', err)
    );
  }

  onSubmit() {
    if (!this.animalIntake.valid) return;

    const formVal = this.animalIntake.value;
    const selectedAnimal = formVal.animal_id ? (this.animals.find(a => a.id == formVal.animal_id) || { id: Number(formVal.animal_id) }) : undefined;
    const selectedStaff = formVal.staff_id ? (this.staffList.find(s => s.id == formVal.staff_id) || { id: Number(formVal.staff_id) }) : undefined;

    const intakeData: Intake = {
      id: this.editingIntakeId,
      intake_date: formVal.intake_date,
      needs_medical: formVal.needs_medical === true || formVal.needs_medical === 'true',
      TYPE: formVal.TYPE as Animal_type,
      animal: selectedAnimal,
      intake_staff_member: selectedStaff
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    if (this.isEditMode && this.editingIntakeId) {
      this.httpClient.put<Intake>(`${this.postIntakeUrl}/${this.editingIntakeId}`, intakeData, options).subscribe(
        res => {
          console.log('Intake updated:', res);
          this.cancelEdit();
          this.fetchIntakes();
        },
        err => console.error('Error updating intake', err)
      );
    } else {
      this.httpClient.post<Intake>(this.postIntakeUrl, intakeData, options).subscribe(
        res => {
          console.log('Intake created:', res);
          if (res) {
            this.intakes = [...this.intakes, res];
          }
          this.cancelEdit();
          this.fetchIntakes();
        },
        err => console.error('Error creating intake', err)
      );
    }
  }

  onEditIntake(intake: Intake) {
    this.isEditMode = true;
    this.editingIntakeId = intake.id;
    this.animalIntake.patchValue({
      intake_date: intake.intake_date || '',
      TYPE: intake.TYPE || Animal_type.DOG,
      needs_medical: intake.needs_medical === true,
      animal_id: intake.animal ? intake.animal.id : '',
      staff_id: intake.intake_staff_member ? intake.intake_staff_member.id : ''
    });
  }

  onDeleteIntake(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this intake record?')) {
      this.httpClient.delete(`${this.postIntakeUrl}/${id}`).subscribe(
        res => {
          console.log('Intake deleted', id);
          this.fetchIntakes();
        },
        err => console.error('Error deleting intake', err)
      );
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingIntakeId = undefined;
    this.animalIntake.reset({
      intake_date: '',
      TYPE: Animal_type.DOG,
      needs_medical: false,
      animal_id: '',
      staff_id: ''
    });
  }
}
