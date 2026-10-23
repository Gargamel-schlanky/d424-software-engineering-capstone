import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal, Intake, Medical, Staff } from '../../models';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['../../app.component.css']
})
export class ReportsComponent implements OnInit {

  private baseURL: string = '';

  intakes: Intake[] = [];
  animals: Animal[] = [];
  medicals: Medical[] = [];
  staffList: Staff[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.httpClient.get<any>(`${this.baseURL}/intake/animal`).subscribe(res => {
      this.intakes = Array.isArray(res) ? res : (Object.values(res)[0] as Intake[]) || [];
    });

    this.httpClient.get<any>(`${this.baseURL}/animals`).subscribe(res => {
      this.animals = Array.isArray(res) ? res : (Object.values(res)[0] as Animal[]) || [];
    });

    this.httpClient.get<any>(`${this.baseURL}/medical`).subscribe(res => {
      this.medicals = Array.isArray(res) ? res : (Object.values(res)[0] as Medical[]) || [];
    });

    this.httpClient.get<any>(`${this.baseURL}/staff`).subscribe(res => {
      this.staffList = Array.isArray(res) ? res : (Object.values(res)[0] as Staff[]) || [];
    });
  }

  get totalIntakes(): number { return this.intakes.length; }
  get medicalNeedsCount(): number { return this.intakes.filter(i => i.needs_medical).length; }

  get totalAnimals(): number { return this.animals.length; }
  get adoptableCount(): number { return this.animals.filter(a => a.adoptable).length; }
  get residentsCount(): number { return this.animals.filter(a => a.current_resident).length; }

  get totalStaff(): number { return this.staffList.length; }
  get onCallStaffCount(): number { return this.staffList.filter(s => s.on_call_duty).length; }

  get totalMedical(): number { return this.medicals.length; }
  get restrictionsCount(): number { return this.medicals.filter(m => m.has_restrictions).length; }

  exportIntakeCSV() {
    let csv = 'Intake ID,Date,Type,Needs Medical,Animal,Staff Member\n';
    this.intakes.forEach(i => {
      const animalName = i.animal ? i.animal.name : 'N/A';
      const staffName = i.intake_staff_member ? i.intake_staff_member.name : 'N/A';
      csv += `"${i.id}","${i.intake_date}","${i.TYPE}","${i.needs_medical ? 'Yes' : 'No'}","${animalName}","${staffName}"\n`;
    });
    this.downloadCSV(csv, 'Intake_Summary_Report.csv');
  }

  exportAnimalsCSV() {
    let csv = 'ID,Name,Age,Description,Medical ID,Adoptable,Current Resident\n';
    this.animals.forEach(a => {
      csv += `"${a.id}","${a.name}","${a.age}","${a.description}","${a.medical_id}","${a.adoptable ? 'Yes' : 'No'}","${a.current_resident ? 'Yes' : 'No'}"\n`;
    });
    this.downloadCSV(csv, 'Animals_Inventory_Report.csv');
  }

  private downloadCSV(csvContent: string, fileName: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  printReport() {
    window.print();
  }
}
