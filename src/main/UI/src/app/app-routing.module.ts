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
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'intake', pathMatch: 'full' },
  { path: 'intake', component: IntakeComponent, canActivate: [AuthGuard] },
  { path: 'intake/form', component: IntakeFormComponent, canActivate: [AuthGuard] },
  { path: 'intake/form/:id', component: IntakeFormComponent, canActivate: [AuthGuard] },
  { path: 'animals', component: AnimalsComponent, canActivate: [AuthGuard] },
  { path: 'animals/form', component: AnimalFormComponent, canActivate: [AuthGuard] },
  { path: 'animals/form/:id', component: AnimalFormComponent, canActivate: [AuthGuard] },
  { path: 'medical', component: MedicalComponent, canActivate: [AuthGuard] },
  { path: 'medical/form', component: MedicalFormComponent, canActivate: [AuthGuard] },
  { path: 'medical/form/:id', component: MedicalFormComponent, canActivate: [AuthGuard] },
  { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
  { path: 'staff/form', component: StaffFormComponent, canActivate: [AuthGuard] },
  { path: 'staff/form/:id', component: StaffFormComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'intake' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
