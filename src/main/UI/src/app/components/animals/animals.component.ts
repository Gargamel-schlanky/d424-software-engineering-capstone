import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../../models';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['../../app.component.css']
})
export class AnimalsComponent implements OnInit {

  private baseURL: string = 'http://localhost:8080';
  private animalsUrl: string = this.baseURL + '/animals';

  addAnimalForm!: FormGroup;
  animalSearch!: FormGroup;

  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.addAnimalForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl(''),
      description: new FormControl(''),
      medical_id: new FormControl(0),
      adoptable: new FormControl(true),
      current_resident: new FormControl(true)
    });

    this.animalSearch = new FormGroup({
      nameFilter: new FormControl('')
    });

    this.fetchAnimals();
  }

  fetchAnimals() {
    this.getAll().subscribe(
      res => {
        if (res) {
          this.animals = Array.isArray(res) ? res : (Object.values(res)[0] as Animal[]) || [];
          this.filterAnimals();
        }
      },
      err => console.log('Error fetching animals', err)
    );
  }

  filterAnimals() {
    const filterText = (this.animalSearch.value.nameFilter || '').toLowerCase();
    if (!filterText) {
      this.filteredAnimals = [...this.animals];
    } else {
      this.filteredAnimals = this.animals.filter(a => (a.name || '').toLowerCase().includes(filterText));
    }
  }

  onAddAnimal() {
    if (!this.addAnimalForm.valid) return;

    const formVal = this.addAnimalForm.value;
    const newAnimal: Animal = {
      name: formVal.name,
      age: formVal.age,
      description: formVal.description,
      medical_id: Number(formVal.medical_id) || 0,
      adoptable: formVal.adoptable === true || formVal.adoptable === 'true',
      current_resident: formVal.current_resident === true || formVal.current_resident === 'true'
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    this.httpClient.post<Animal>(this.animalsUrl, newAnimal, options).subscribe(
      res => {
        console.log('Animal successfully added:', res);
        this.addAnimalForm.reset({
          name: '',
          age: '',
          description: '',
          medical_id: 0,
          adoptable: true,
          current_resident: true
        });
        this.fetchAnimals();
      },
      err => console.error('Error adding animal', err)
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.animalsUrl, { responseType: 'json' });
  }
}
