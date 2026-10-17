import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntakeComponent } from './components/intake/intake.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { MedicalComponent } from './components/medical/medical.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'intake', pathMatch: 'full' },
  { path: 'intake', component: IntakeComponent },
  { path: 'animals', component: AnimalsComponent },
  { path: 'medical', component: MedicalComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'staff/form', component: StaffFormComponent },
  { path: 'staff/form/:id', component: StaffFormComponent },
  { path: '**', redirectTo: 'intake' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
