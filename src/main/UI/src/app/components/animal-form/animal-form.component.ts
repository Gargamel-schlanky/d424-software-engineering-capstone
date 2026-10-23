import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../models';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['../../app.component.css']
})
export class AnimalFormComponent implements OnInit {

  private baseURL: string = '';
  private animalsUrl: string = this.baseURL + '/animals';

  addAnimalForm!: FormGroup;
  isEditMode: boolean = false;
  animalId?: number;
  selectedPhotoUrl: string = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.addAnimalForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl(''),
      description: new FormControl(''),
      medical_id: new FormControl(0),
      adoptable: new FormControl(true),
      current_resident: new FormControl(true)
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.animalId = Number(idParam);
      this.loadAnimal(this.animalId);
    }
  }

  loadAnimal(id: number) {
    this.httpClient.get<Animal>(`${this.animalsUrl}/${id}`).subscribe(
      res => {
        if (res) {
          this.selectedPhotoUrl = res.photoUrl || '';
          this.addAnimalForm.patchValue({
            name: res.name || '',
            age: res.age || '',
            description: res.description || '',
            medical_id: res.medical_id || 0,
            adoptable: res.adoptable === true,
            current_resident: res.current_resident === true
          });
        }
      },
      err => console.error('Error loading animal', err)
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
    if (!this.addAnimalForm.valid) return;

    const formVal = this.addAnimalForm.value;
    const animalData: Animal = {
      id: this.animalId,
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

    if (this.isEditMode && this.animalId) {
      this.httpClient.put<Animal>(`${this.animalsUrl}/${this.animalId}`, animalData, options).subscribe(
        res => {
          console.log('Animal updated:', res);
          this.router.navigate(['/animals']);
        },
        err => console.error('Error updating animal', err)
      );
    } else {
      this.httpClient.post<Animal>(this.animalsUrl, animalData, options).subscribe(
        res => {
          console.log('Animal added:', res);
          this.router.navigate(['/animals']);
        },
        err => console.error('Error adding animal', err)
      );
    }
  }

  onCancel() {
    this.router.navigate(['/animals']);
  }
}
