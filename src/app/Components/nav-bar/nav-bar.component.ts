import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { DoctorService } from 'src/app/Services/doctor-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isDoctor: boolean = false;
  searchResult: any = [];
  searchErr: any = null;
  searchBoxTxt: string = '';
  errRespon: any;
  role: any;
  constructor(
    public _AuthService: AuthService,
    private _Router: Router,
    public _UserService: UserService,
    private _DoctorService: DoctorService,
    private _snackBar: MatSnackBar
  ) {
    // _AuthService.userRole.subscribe((data) => {
    //   if (data != null && data == 'User') {
    //     this.isboxsearch = true;
    //   }
    //   else if (data != null && data == "Doctor") {
    //     this.isbtnDoc = true;
    //   }
    // });
    // _DoctorService.doctorData.subscribe(data=>{
    //   console.log(data);
    // });
    this.role = localStorage.getItem('role');
    //console.log(this.role);
  }
  ngOnInit(): void {
    if (this.role == 'Doctor') {
      console.log({ role: this.role });

      this.isDoctor = true;
    } else this.isDoctor = false;
  }

  /* Start Patient-side*/
  observerForSearch = {
    next: (data: any) => {
      this.searchResult = data.doctors;
    },
    error: (err: any) => {
      this.searchErr = err;
    },
  };
  searchDoc(input: string) {
    if (this.searchBoxTxt != '' && this.searchBoxTxt != null) {
      this._UserService.search(input).subscribe(this.observerForSearch);
    }
  }

  openDocProfile(docID: any) {
    return this._Router.navigate(['/appoint/', 'doctor', docID]);
  }
  /* End Patient-side*/

  openSnackBar() {
    this._snackBar.open(this.errRespon.error.message, 'retry', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /* Start Doctor-side*/

  observerForProfileDoc = {
    next: (data: any) => {
      if (data.message == 'Done') {
        console.log(data);
        this._Router.navigate(['/profile', 'doctor', data?.doctor?.id]);
      }
    },
    error: (err: any) => {
      this.errRespon = err;
      this.openSnackBar();
    },
  };
  getProfileDoc() {
    if (this.isDoctor == true) {
      return this._DoctorService
        .getProfileDoc()
        .subscribe(this.observerForProfileDoc);
    } else {
      return this._Router.navigate(['/profile', 'patient']);
    }
  }

  /* End Doctor-side*/

  navForHome() {
    if (this.isDoctor == true) {
      this._Router.navigate(['/home', 'doctor']);
    } else this._Router.navigate(['/home', 'patient']);
  }

  logOut() {
    localStorage.clear(); //clear all localstorage
    this.isDoctor = false;
    return this._Router.navigate(['/home']);
  }
}
