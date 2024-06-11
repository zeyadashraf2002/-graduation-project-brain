import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor-service.service';
@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.scss'],
})
export class HomePatientComponent implements OnInit {
  topDoctor: any = [];
  IsWait: boolean = true;
  backgroundUrl: string = 'assets/home/Vector.png';
  constructor(private _DoctorService: DoctorService, private _Router: Router) {}
  ngOnInit(): void {
    this._DoctorService.getTopRating().subscribe({
      next: (data) => {
        this.IsWait = false;
        this.topDoctor = data.doctors;
      },
      error: (err: any) => {
        this.IsWait = false;
        console.log(err);
      },
    });
  }
  openDocProfile(docID: number) {
    return this._Router.navigate(['/appoint', 'doctor', docID]);
  }
}
