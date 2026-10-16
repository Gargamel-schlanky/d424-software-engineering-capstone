import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntakeComponent } from './components/intake/intake.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { MedicalComponent } from './components/medical/medical.component';
import { StaffComponent } from './components/staff/staff.component';

const routes: Routes = [
  { path: '', redirectTo: 'intake', pathMatch: 'full' },
  { path: 'intake', component: IntakeComponent },
  { path: 'animals', component: AnimalsComponent },
  { path: 'medical', component: MedicalComponent },
  { path: 'staff', component: StaffComponent },
  { path: '**', redirectTo: 'intake' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
