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

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.animalIntake = new FormGroup({
      intake_date: new FormControl('', Validators.required),
      TYPE: new FormControl(Animal_type.DOG, Validators.required),
      needs_medical: new FormControl(false),
      animal_id: new FormControl(''),
      staff_id: new FormControl('')
    });

    this.fetchIntakes();
    this.fetchAnimals();
    this.fetchStaff();
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
    const formVal = this.animalIntake.value;

    const selectedAnimal = this.animals.find(a => a.id == formVal.animal_id) || (formVal.animal_id ? { id: Number(formVal.animal_id) } : undefined);
    const selectedStaff = this.staffList.find(s => s.id == formVal.staff_id) || (formVal.staff_id ? { id: Number(formVal.staff_id) } : undefined);

    const newIntake: Intake = {
      intake_date: formVal.intake_date,
      needs_medical: formVal.needs_medical === true || formVal.needs_medical === 'true',
      TYPE: formVal.TYPE as Animal_type,
      animal: selectedAnimal,
      intake_staff_member: selectedStaff
    };

    this.createIntake(newIntake);
  }

  createIntake(body: Intake) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    this.httpClient.post(this.postIntakeUrl, body, options).subscribe(
      res => {
        console.log('Intake successfully created:', res);
        this.animalIntake.reset({
          intake_date: '',
          TYPE: Animal_type.DOG,
          needs_medical: false,
          animal_id: '',
          staff_id: ''
        });
        this.fetchIntakes();
      },
      err => console.error('Error creating intake', err)
    );
  }
}
