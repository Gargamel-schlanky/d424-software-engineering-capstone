import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Animal, Animal_type, Intake, Medical, Staff } from './models';

export interface AnimalSearch {
  animal?: string;
  intake?: string;
}

export class AddAnimalRequest {
  id?: number;
  name?: string;
  age?: string;
  description?: string;
  medical_id?: number;
  adoptable?: boolean;
  current_resident?: boolean;

  constructor(
    name?: string,
    age?: string,
    description?: string,
    medical_id?: number,
    adoptable?: boolean,
    current_resident?: boolean
  ) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.medical_id = medical_id;
    this.adoptable = adoptable;
    this.current_resident = current_resident;
  }
}

export class AddIntakeRequest {
  id?: number;
  intake_date?: string;
  intake_staff_member?: Staff;
  needs_medical?: boolean;
  TYPE?: Animal_type;
  animal?: Animal;

  constructor(
    intake_date?: string,
    intake_staff_member?: Staff,
    needs_medical?: boolean,
    TYPE?: Animal_type,
    animal?: Animal
  ) {
    this.intake_date = intake_date;
    this.intake_staff_member = intake_staff_member;
    this.needs_medical = needs_medical;
    this.TYPE = TYPE;
    this.animal = animal;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  private baseURL: string = 'http://localhost:8080';

  private getUrl: string = this.baseURL + '/intake/animal';
  private postUrl: string = this.baseURL + '/intake/animal';
  public submitted!: boolean;

  animalIntake!: FormGroup;
  animalSearch!: FormGroup;

  animals!: Animal[];
  intakes!: Intake[];
  medicals!: Medical[];
  staffMembers!: Staff[];

  request!: AddAnimalRequest;
  currentAnimal!: string;
  currentIntakeVal!: string;

  ngOnInit() {
    this.animalSearch = new FormGroup({
      animal: new FormControl(' '),
      intake: new FormControl(' ')
    });

    this.animalIntake = new FormGroup({
      intake: new FormControl(' '),
      animal: new FormControl(' '),
      TYPE: new FormControl(' ')
    });

    const animalSearchValueChanges$ = this.animalSearch.valueChanges;

    animalSearchValueChanges$.subscribe(x => {
      this.currentAnimal = x.animal;
      this.currentIntakeVal = x.intake;
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.getAll().subscribe(
      res => {
        console.log(Object.values(res)[0]);
        this.intakes = <Intake[]>Object.values(res)[0];
      }
    );
  }

  submitIntake(id?: number) {
    const intakeReq = new AddIntakeRequest(this.currentIntakeVal, undefined, false, Animal_type.UNKNOWN);
    this.createIntake(intakeReq);
  }

  createIntake(body: AddIntakeRequest) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    };

    this.httpClient.post(this.postUrl, body, options)
      .subscribe(res => console.log(res));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.getUrl, { responseType: 'json' });
  }
}

export { Animal, Animal_type, Intake, Medical, Staff };
