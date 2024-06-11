import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errMessage: any;
  IsWait: boolean = false;
  hide: boolean = true;
  backgroundUrl: any = 'assets/home/Vector.png';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('m.ramadan181199@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('M123', [Validators.required]),
  });
  constructor(
    public _router: Router,
    public _AuthService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  openSnackBar() {
    this._snackBar.open(this.errMessage.error.message, 'login again', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ObserverForLogin = {
    next: (data: any) => {
      this.IsWait = true;
      let userToken: string = data.token;
      console.log(data);

      if (data.user?.role == 'Doctor') {
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);
        // this._AuthService.saveUserData(userToken, data.role);
        this._router.navigate(['/home', 'doctor']);
      } else if (data.user?.role == 'User') {
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);
        // this._AuthService.saveUserData(userToken, data.role);
        this._router.navigate(['/home', 'patient']);
      }
    },
    error: (err: Error) => {
      this.errMessage = err;
      this.openSnackBar();
    },
  };
  getFormData(formData: any) {
    const modal = {
      ...formData.value,
    };
    console.log(modal);

    this._AuthService.login(modal).subscribe(this.ObserverForLogin);
  }
}
