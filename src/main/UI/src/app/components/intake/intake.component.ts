import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal, Animal_type, Intake, Staff } from '../../models';

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
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['../../app.component.css']
})
export class IntakeComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private getUrl: string = this.baseURL + '/intake/animal';
  private postUrl: string = this.baseURL + '/intake/animal';

  animalIntake!: FormGroup;
  intakes: Intake[] = [];
  currentIntakeVal: string = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.animalIntake = new FormGroup({
      intake: new FormControl(''),
      animal: new FormControl(''),
      TYPE: new FormControl('')
    });

    this.animalIntake.valueChanges.subscribe(x => {
      this.currentIntakeVal = x.intake;
    });

    this.fetchIntakes();
  }

  fetchIntakes() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.intakes = Array.isArray(res) ? res : (Object.values(res)[0] as Intake[]) || [];
        }
      },
      err => console.log(err)
    );
  }

  onSubmit(form: FormGroup) {
    const intakeReq = new AddIntakeRequest(this.currentIntakeVal || form.value.intake, undefined, false, Animal_type.UNKNOWN);
    this.createIntake(intakeReq);
  }

  submitIntake(id?: number) {
    const intakeReq = new AddIntakeRequest(this.currentIntakeVal, undefined, false, Animal_type.UNKNOWN);
    this.createIntake(intakeReq);
  }

  createIntake(body: AddIntakeRequest) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    this.httpClient.post(this.postUrl, body, options).subscribe(
      res => {
        console.log('Intake submitted', res);
        this.fetchIntakes();
      },
      err => console.error(err)
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.getUrl, { responseType: 'json' });
  }
}
