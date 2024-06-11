import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ResultComponent } from '../result/result.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss'],
})
export class DoctorAppointmentComponent implements OnInit {
  @Input() maxRating = 5;
  maxRatingArr: any = [];
  @Output()
  onRating: EventEmitter<number> = new EventEmitter<number>();
  @Input() SelectedStar: number = 0;
  previousSelection: number = 0;
  errRespon: any;
  errBookRespon: any;
  IsWait: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  profileDocData: any;
  appDocData: any;
  docID: any;
  bookRespn: any;
  rateOfDoctor: FormGroup;
  AppointID: any;
  respOfRate: any;
  observerForAppDoc = {
    next: (data: any) => {
      if (data.message == 'Done') {
        this.profileDocData = data.doctor;
        this.appDocData = this.profileDocData.availableDates;
        console.log('A7A', this.profileDocData.appointments[0]);

        this.IsWait = false;
        console.log(this.profileDocData);
        console.log(this.appDocData);
      }
    },
    error: (err: any) => {
      this.errRespon = err;
      this.openSnackBar();
    },
  };
  observerForBook = {
    next: (data: any) => {
      // if (data.message == 'Appointment created successfully.') {
      //   this.bookRespn = data.message;
      //console.log(this.bookRespn);
      // this.openSnackBarForBook();
      // this.ngOnInit();
      // }
    },
    error: (err: any) => {
      this.errRespon = err.error;
      console.log(this.errBookRespon);
    },
  };
  constructor(
    private _MatDialog: MatDialog,
    private _ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _UserService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.docID = this._ActivatedRoute.snapshot.paramMap.get('dID');
    //console.log(this.AppointID);
    // console.log(localStorage.getItem('token'));
    this.rateOfDoctor = fb.group({
      text: [''],
      rate: [this.SelectedStar],
      doctorId: [this.docID],
    });
  }

  ngOnInit(): void {
    this._UserService.getDocByID(this.docID).subscribe(this.observerForAppDoc);
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }
  book(sID: any) {
    this._UserService
      .bookAppoint(sID, this.docID)
      .subscribe(this.observerForBook);
  }
  openSnackBar() {
    this._snackBar.open(this.errRespon.error.message, 'retry', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBarForBook() {
    this._snackBar.open('Booking Confirmed', 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openDialog() {
    this._MatDialog.open(ResultComponent);
  }

  HandelMouseEnter(index: number) {
    this.SelectedStar = index + 1;
  }

  HandelEnter(index: number) {
    this.SelectedStar = index + 1;
  }
  HandelMouseLeave() {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
    } else {
      this.SelectedStar = 0;
    }
  }
  Rating(index: number) {
    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
    this.onRating.emit(this.SelectedStar + 1);
    console.log(this.SelectedStar);
  }
  submit(form: any) {
    console.log(form.value);
    this._UserService.sendRate(form.value).subscribe((data) => {
      if (data.message == 'Done') {
        this.respOfRate = data.message;
        this.msgOfRate();
        this.ngOnInit();
      }
    });
  }
  msgOfRate() {
    this._snackBar.open('Your rate is send to the doctor', 'done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
