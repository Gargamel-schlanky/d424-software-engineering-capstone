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

  isEditMode: boolean = false;
  editingAnimalId?: number;
  selectedPhotoUrl: string = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.initForm();
    this.animalSearch = new FormGroup({
      nameFilter: new FormControl('')
    });

    this.fetchAnimals();
  }

  initForm() {
    this.addAnimalForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl(''),
      description: new FormControl(''),
      medical_id: new FormControl(0),
      adoptable: new FormControl(true),
      current_resident: new FormControl(true)
    });
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

  onSaveAnimal() {
    if (!this.addAnimalForm.valid) return;

    const formVal = this.addAnimalForm.value;
    const animalData: Animal = {
      id: this.editingAnimalId,
      name: formVal.name,
      age: formVal.age,
      description: formVal.description,
      medical_id: Number(formVal.medical_id) || 0,
      adoptable: formVal.adoptable === true || formVal.adoptable === 'true',
      current_resident: formVal.current_resident === true || formVal.current_resident === 'true',
      photoUrl: this.selectedPhotoUrl || undefined
    };

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    if (this.isEditMode && this.editingAnimalId) {
      this.httpClient.put<Animal>(`${this.animalsUrl}/${this.editingAnimalId}`, animalData, options).subscribe(
        res => {
          console.log('Animal updated:', res);
          this.cancelEdit();
          this.fetchAnimals();
        },
        err => console.error('Error updating animal', err)
      );
    } else {
      this.httpClient.post<Animal>(this.animalsUrl, animalData, options).subscribe(
        res => {
          console.log('Animal added:', res);
          this.cancelEdit();
          this.fetchAnimals();
        },
        err => console.error('Error adding animal', err)
      );
    }
  }

  onEditAnimal(animal: Animal) {
    this.isEditMode = true;
    this.editingAnimalId = animal.id;
    this.selectedPhotoUrl = animal.photoUrl || '';
    this.addAnimalForm.patchValue({
      name: animal.name || '',
      age: animal.age || '',
      description: animal.description || '',
      medical_id: animal.medical_id || 0,
      adoptable: animal.adoptable === true,
      current_resident: animal.current_resident === true
    });
  }

  onDeleteAnimal(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this animal record?')) {
      this.httpClient.delete(`${this.animalsUrl}/${id}`).subscribe(
        res => {
          console.log('Animal deleted', id);
          this.fetchAnimals();
        },
        err => console.error('Error deleting animal', err)
      );
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingAnimalId = undefined;
    this.selectedPhotoUrl = '';
    this.addAnimalForm.reset({
      name: '',
      age: '',
      description: '',
      medical_id: 0,
      adoptable: true,
      current_resident: true
    });
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.animalsUrl, { responseType: 'json' });
  }
}
