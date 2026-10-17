import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../../models';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['../../app.component.css']
})
export class AnimalsComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private getUrl: string = this.baseURL + '/intake/animal';

  animalSearch!: FormGroup;
  animals: Animal[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.animalSearch = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      description: new FormControl('')
    });

    this.fetchAnimals();
  }

  fetchAnimals() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.animals = Array.isArray(res) ? res : (Object.values(res)[0] as Animal[]) || [];
        }
      },
      err => console.log(err)
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.getUrl, { responseType: 'json' });
  }
}
