import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    IntakeComponent,
    IntakeFormComponent,
    AnimalsComponent,
    AnimalFormComponent,
    MedicalComponent,
    MedicalFormComponent,
    StaffComponent,
    StaffFormComponent,
    ReportsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
