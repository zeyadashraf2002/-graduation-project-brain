import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { IUser } from 'src/app/models/iuser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  errMessage: any;
  hide: boolean = true;
  backgroundUrl: string = 'assets/home/Vector.png';
  isDoctor: boolean = false;
  selectedDates: Date[] = [];

  @Output() dateSelected = new EventEmitter<Date[]>();
  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    address: new FormControl(null, [Validators.required]),
    // 'clinicAddress': new FormControl(''),
    // 'phone': new FormControl('', [Validators.pattern('^[0-9]{11}$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      // Validators.pattern('^[A-Z][a-z0-9]{3,8}$'),
    ]),
    cPass: new FormControl(null, [
      Validators.required,
      // Validators.pattern('^[A-Z][a-z0-9]{3,8}$'),
    ]),
    type: new FormControl(false),
  });

  constructor(
    public _AuthService: AuthService,
    public _Router: Router,
    private _snackBar: MatSnackBar
  ) {}

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    if (selectedDate && !this.isSelected(selectedDate)) {
      this.selectedDates.push(selectedDate);
      this.dateSelected.emit(this.selectedDates);
    }
  }

  removeDate(date: Date): void {
    const index = this.selectedDates.indexOf(date);
    if (index !== -1) {
      this.selectedDates.splice(index, 1);
      this.dateSelected.emit(this.selectedDates);
    }
  }

  isSelected(date: Date): boolean {
    return this.selectedDates.some((d) => d.getTime() === date.getTime());
  }

  openSnackBar() {
    this._snackBar.open(this.errMessage.error.message, 'Signin Again', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ObserverForSignup = {
    next: (data: any) => {
      if (data.message == 'registration success , please confirm your email') {
        this._Router.navigate(['/login']);
      }
    },
    error: (err: Error) => {
      this.errMessage = err;
      this.openSnackBar();
    },
  };

  submit() {
    const formData: IUser = <IUser>this.signupForm.value;
    if (this.isDoctor) {
      const dates = this.selectedDates.map((date: Date) =>
        moment(date).format('YYYY-MM-DD')
      );
      const modal = {
        ...formData,
        type: formData.type ? 'Doctor' : 'User',
        availableDates: dates,
      };
      this._AuthService.signup(modal).subscribe(this.ObserverForSignup);
    } else {
      const modal = {
        ...formData,
        type: formData.type ? 'Doctor' : 'User',
      };
      this._AuthService.signup(modal).subscribe(this.ObserverForSignup);
    }
  }
}
