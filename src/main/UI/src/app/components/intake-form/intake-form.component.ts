import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal, Animal_type, Intake, Staff } from '../../models';

@Component({
  selector: 'app-intake-form',
  templateUrl: './intake-form.component.html',
  styleUrls: ['../../app.component.css']
})
export class IntakeFormComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private postIntakeUrl: string = this.baseURL + '/intake/animal';
  private getAnimalsUrl: string = this.baseURL + '/animals';
  private getStaffUrl: string = this.baseURL + '/staff';

  animalIntake!: FormGroup;
  animals: Animal[] = [];
  staffList: Staff[] = [];

  isEditMode: boolean = false;
  intakeId?: number;
  selectedPhotoUrl: string = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.animalIntake = new FormGroup({
      intake_date: new FormControl('', Validators.required),
      TYPE: new FormControl(Animal_type.DOG, Validators.required),
      needs_medical: new FormControl(false),
      animal_id: new FormControl(''),
      new_animal_name: new FormControl(''),
      new_animal_age: new FormControl(''),
      new_animal_description: new FormControl(''),
      staff_id: new FormControl('')
    });

    this.fetchAnimals();
    this.fetchStaff();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.intakeId = Number(idParam);
      this.loadIntake(this.intakeId);
    }
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

  loadIntake(id: number) {
    this.httpClient.get<Intake>(`${this.postIntakeUrl}/${id}`).subscribe(
      res => {
        if (res) {
          this.animalIntake.patchValue({
            intake_date: res.intake_date || '',
            TYPE: res.TYPE || Animal_type.DOG,
            needs_medical: res.needs_medical === true,
            animal_id: res.animal ? res.animal.id : '',
            staff_id: res.intake_staff_member ? res.intake_staff_member.id : ''
          });
          if (res.animal && res.animal.photoUrl) {
            this.selectedPhotoUrl = res.animal.photoUrl;
          }
        }
      },
      err => console.error('Error loading intake', err)
    );
  }

  onPhotoSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhotoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.animalIntake.valid) return;

    const formVal = this.animalIntake.value;

    let targetAnimal: Animal | undefined = undefined;

    if (formVal.animal_id) {
      targetAnimal = this.animals.find(a => a.id == formVal.animal_id) || { id: Number(formVal.animal_id) };
    } else if (formVal.new_animal_name && formVal.new_animal_name.trim().length > 0) {
      targetAnimal = {
        name: formVal.new_animal_name,
        age: formVal.new_animal_age,
        description: formVal.new_animal_description,
        adoptable: true,
        current_resident: true,
        photoUrl: this.selectedPhotoUrl || undefined
      };
    }

    const selectedStaff = formVal.staff_id ? (this.staffList.find(s => s.id == formVal.staff_id) || { id: Number(formVal.staff_id) }) : undefined;

    const intakeData: Intake = {
      id: this.intakeId,
      intake_date: formVal.intake_date,
      needs_medical: formVal.needs_medical === true || formVal.needs_medical === 'true',
      TYPE: formVal.TYPE as Animal_type,
      animal: targetAnimal,
      intake_staff_member: selectedStaff
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    if (this.isEditMode && this.intakeId) {
      this.httpClient.put<Intake>(`${this.postIntakeUrl}/${this.intakeId}`, intakeData, options).subscribe(
        res => {
          console.log('Intake updated:', res);
          alert('Intake Insertion & Update Complete!\n\nIntake record successfully updated in the database. Task completed.');
          this.router.navigate(['/intake']);
        },
        err => console.error('Error updating intake', err)
      );
    } else {
      this.httpClient.post<Intake>(this.postIntakeUrl, intakeData, options).subscribe(
        res => {
          console.log('Intake created:', res);
          alert('Intake Insertion Complete!\n\nNew intake record successfully inserted into the database. Task completed.');
          this.router.navigate(['/intake']);
        },
        err => console.error('Error creating intake', err)
      );
    }
  }

  onCancel() {
    this.router.navigate(['/intake']);
  }
}
