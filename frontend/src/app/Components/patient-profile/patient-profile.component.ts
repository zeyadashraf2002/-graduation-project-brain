import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  backgroundUrl: string = 'assets/patient/Vector.png';
  isDoctor: boolean = false;
  IsWait: boolean = true;
  errRespon: any;
  role: any;
  dataPatient: any;
  dataAppoint: any;
  observerForPatientProfile = {
    next: (data: any) => {
      if ((data.message = 'Done')) {
        this.dataPatient = data.user;
        this.dataAppoint = data.lastAppointment;
        this.IsWait = false;
        console.log(this.dataPatient);
        console.log(this.dataAppoint);
      }
    },
    error: (err: any) => {
      this.errRespon = err;
      console.log({ err });

      this.openSnackBar();
    },
  };
  constructor(private _UserService: UserService) {
    this.role = localStorage.getItem('role');
  }
  ngOnInit(): void {
    if (this.role == 'Doctor') {
      this.isDoctor = true;
    } else {
      this.isDoctor = false;
    }

    this._UserService
      .getPatientProfile()
      .subscribe(this.observerForPatientProfile);
  }
  openSnackBar() {}
}
