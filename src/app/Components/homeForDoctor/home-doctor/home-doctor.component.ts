import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../Services/doctor-service.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.scss'],
})
export class HomeDoctorComponent implements OnInit {
  errRespon: any;
  IsWait: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  appoints: any = [];
  comingAppoint: any = [];
  backgroundUrl: any = 'assets/home/Vector.png';
  constructor(
    private _DoctorService: DoctorService,
    private _snackBar: MatSnackBar,
    private _Router: Router
  ) {}
  observerForAllAppoints = {
    next: (data: any) => {
      this.IsWait = false;
      this.appoints = data;
      // for (let i = 0; i < this.appoints.length; i++) {
      //   this.appointID = this.appoints[i]._id;
      //   console.log(this.appointID);
      // }
      //console.log(this.appoints);
      // console.log(this.appointID);
    },
    error: (err: any) => {
      this.errRespon = err;
      this.IsWait = false;
    },
  };

  observerForAccept = {
    next: (data: any) => {
      console.log(data);
      this.msgOfAcc();
      this.ngOnInit();
    },
    error: (err: any) => {
      /*this.errRespon=err*/ console.log(err);
    },
  };
  observerForCancel = {
    next: (data: any) => {
      console.log(data);
      this.msgOfRej();
      this.ngOnInit();
    },
    error: (err: any) => {
      /*this.errRespon=err*/ console.log(err);
    },
  };

  ngOnInit(): void {
    this._DoctorService.getAllAppoint().subscribe(this.observerForAllAppoints);
    this._DoctorService.getComingAppoint().subscribe({
      next: (data) => {
        if (data.message == 'Done') {
          this.comingAppoint = data.appointments;
        }
      },
      error: (err: any) => {
        /*this.errRespon=err*/ console.log(err);
      },
    });
  }

  acceptAppoint(id: any) {
    return this._DoctorService
      .acceptAppoint(id)
      .subscribe(this.observerForAccept);
  }
  msgOfAcc() {
    this._snackBar.open('Appointment Accepted', 'done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  cancelAppoint(id: any) {
    return this._DoctorService
      .cancelAppoint(id)
      .subscribe(this.observerForCancel);
  }
  msgOfRej() {
    this._snackBar.open('Appointment Canceled', 'done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBar() {
    this._snackBar.open(this.errRespon.error.message, 'retry', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBarForSuccess() {
    this._snackBar.open('Appoint is confirmed', 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBarForCancel() {
    this._snackBar.open('Appoint is Canceld', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openPatientProfile(pID: any) {
    return this._Router.navigate(['/profile', 'Patient', pID]);
  }
}
