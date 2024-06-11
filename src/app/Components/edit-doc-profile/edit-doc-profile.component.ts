import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor-service.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

// import { MomentDateModule } from '@angular/material-moment-adapter';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
const URL = `${environment.baseApi}/doctor/upload`;
// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY'
//   },
// };
@Component({
  selector: 'app-edit-doc-profile',
  templateUrl: './edit-doc-profile.component.html',
  styleUrls: ['./edit-doc-profile.component.scss'],
})
export class EditDocProfileComponent implements OnInit, OnChanges {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;
  timeWithPipe: any;
  docProfileData: any;
  time: any;
  secTime: any;
  editProfileDoctor: FormGroup;
  // editAppointDoctor: FormGroup;
  editAppointDoctor: FormGroup = new FormGroup({
    availableDate: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
  });
  IsWait: boolean = true;
  isUploaded: boolean = false;
  errRespon: any;
  dateHandeled: any;
  //   editProfileDoctor: FormGroup = new FormGroup({

  //    'firstName': new FormControl('', [Validators.minLength(5), Validators.maxLength(15)]),
  //    'lastName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
  //    'address': new FormControl(''),
  //    'clinicAddress': new FormControl(''),
  //    'phone': new FormControl('', [Validators.pattern('^[0-9]{11}$')]),
  //  });
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    method: 'PATCH',
    authToken: `Bearer ${localStorage.getItem('token')}`,
  });

  observerForEditProfileDoc = {
    next: (data: any) => {
      if ((data.message = 'Done')) {
        this.docProfileData = data.doctor;
        this.IsWait = false;
        //console.log(this.docProfileData);
      }
    },
    error: (err: any) => {
      this.errRespon = err;
      this.openSnackBar();
    },
  };

  constructor(
    private _Router: Router,
    private _DoctorService: DoctorService,
    private _ToastrService: ToastrService,
    private fb: FormBuilder
  ) {
    this.editProfileDoctor = fb.group({
      firstName: ['', [Validators.minLength(5), Validators.maxLength(15)]],
      lastName: ['', [Validators.minLength(5), Validators.maxLength(15)]],
      address: [''],
      phone: ['', [Validators.pattern('^[0-9]{11}$')]],
      email: [''],
      clinicAddress: [''],
    });
    // this.editAppointDoctor = fb.group({
    //   'availableDates': [],
    //   'from':fb.array (['']),
    //   'to':fb.array (['']),
    // });
    this.dateHandeled = this.editAppointDoctor.get('availableDates');
    console.log(this.dateHandeled);
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.isUploaded = true;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      console.log(status);
      this._ToastrService.success('File successfully uploaded!');
      this.ngOnInit();
    };

    // display Profile Data

    this._DoctorService
      .getProfileDoc()
      .subscribe(this.observerForEditProfileDoc);
    this.todayWithPipe = this.pipe.transform(this.dateHandeled, 'yyyy-MM-dd');
    console.log(this.todayWithPipe);
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toString());

  editProfDoc(form: any) {
    console.log(form.value);
    this._DoctorService.editDocProfile(form.value).subscribe((data) => {
      if (data.message == 'Done') {
        console.log(data);
        this.msgOfUpdate();
        this.ngOnInit;
      }
    });
  }
  msgOfUpdate() {
    this._ToastrService.success('Your Profile is uploaded!');
  }
  get availableDates() {
    return this.editAppointDoctor.get('availableDates');
  }
  // get fromWorkHours() {
  //   return this.editAppointDoctor.get('from') as FormArray;
  // }
  // get toWorkHours() {
  //   return this.editAppointDoctor.get('to') as FormArray;
  // }
  // addAvDate() {
  //   this.availableDates.controls.push(new FormControl(''));
  // }
  // addfHours() {
  //   this.fromWorkHours.controls.push(new FormControl(''));
  // }
  // addtHours() {
  //   this.toWorkHours.controls.push(new FormControl(''));
  // }
  openSnackBar() {}

  backHome() {
    this._Router.navigate(['/home/doctor']);
  }

  submit(form: any) {
    this._DoctorService.sendAvAppoint(form.value).subscribe((data) => {
      if (data.message == 'Done') {
        this.msgOfSendApoint();
      }
    });
  }
  msgOfSendApoint() {}
}
