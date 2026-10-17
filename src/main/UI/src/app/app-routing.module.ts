import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntakeComponent } from './components/intake/intake.component';
import { IntakeFormComponent } from './components/intake-form/intake-form.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { MedicalComponent } from './components/medical/medical.component';
import { MedicalFormComponent } from './components/medical-form/medical-form.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'intake', pathMatch: 'full' },
  { path: 'intake', component: IntakeComponent },
  { path: 'intake/form', component: IntakeFormComponent },
  { path: 'intake/form/:id', component: IntakeFormComponent },
  { path: 'animals', component: AnimalsComponent },
  { path: 'animals/form', component: AnimalFormComponent },
  { path: 'animals/form/:id', component: AnimalFormComponent },
  { path: 'medical', component: MedicalComponent },
  { path: 'medical/form', component: MedicalFormComponent },
  { path: 'medical/form/:id', component: MedicalFormComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'staff/form', component: StaffFormComponent },
  { path: 'staff/form/:id', component: StaffFormComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', redirectTo: 'intake' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
