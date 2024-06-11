import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {DoctorService} from '../Services/doctor-service.service';
import {UserService} from'../Services/user.service';
import{ActivatedRoute}from'@angular/router';
//import { data } from 'jquery';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
@Component({
  selector: 'app-edit-appoientment',
  templateUrl: './edit-appoientment.component.html',
  styleUrls: ['./edit-appoientment.component.scss']
})
export class EditAppoientmentComponent implements OnInit {

  backgroundUrl:string='assets/patient/Vector.png';
  isDoctor:boolean=false;
  IsWait:boolean=true;
  errRespon:any;
  role:any;
  pID:any;
  dataNotes:any=[];
  dataPatient:any;
  dataAppoint:any;
  medHistory:any;
  addNote:FormGroup;
  editMedHistory:FormGroup;
  observerForPatientProfile={
    next:(data:any)=>{
      console.log(data);
      if (data.message = 'Done') {
        this.dataPatient=data.user;
        this.dataAppoint=data.lastAppointment;
        this.medHistory=data.medicalHistory;
        this.dataNotes=data.notes;
        this.IsWait=false;
        console.log(this.dataPatient);
        console.log(this.dataAppoint);
        console.log(this.medHistory);
        console.log(this.dataNotes);
      }
    },
    error:(err:any)=>{this.errRespon=err;this.openSnackBar()}
  }
  constructor(private _snackBar: MatSnackBar,private _DoctorService:DoctorService
              ,private _ActivatedRoute:ActivatedRoute
              ,private _UserService:UserService ,private fb:FormBuilder ){
              this.pID=this._ActivatedRoute.snapshot.paramMap.get('pID');
              console.log(this.pID);


              this.editMedHistory=fb.group({
                'tumorType': [''],
                'treatment': [''],
                'patientId':[this.pID]
              });
              this.addNote=fb.group({
                'content':[''],
                'patientId':[this.pID]
              })
            }
  // observerForAllAppoints={
  //   next:(data:any)=>{
  //     if(data.message=='Done'){
  //       this.IsWait=false;
  //       this.appoints=data.appointments;
  //       this.appointID=this.appoints._id;
  //       for (let i = 0; i < this.appoints.length; i++) {
  //         this.appointID = this.appoints[i]._id;
  //         console.log(this.appointID);
  //       }
  //       console.log(this.appoints);
  //      // console.log(this.appointID);
  //     }
  //   },
  //   error:(err:any)=>{this.errRespon=err;this.openSnackBar()}
  // }
  
  ngOnInit(): void {
     this._UserService.getPatientByID(this.pID).subscribe(this.observerForPatientProfile);
  }
  openSnackBar(){

  }


  getFormData(formData: any) {
    console.log(formData.value);
    this._DoctorService.addMedHistory(formData.value).subscribe(()=>{this.ngOnInit()});
  }
  addNewNote(formOfNote:any){
    console.log(formOfNote);
    this._DoctorService.addNotes(formOfNote.value).subscribe((data)=>console.log(data));
    this.ngOnInit();
  }
  // acceptAppoint(id:any){
  //   return this._DoctorService.acceptAppoint(id).subscribe()
  // }
  // openSnackBar() {
  //   this._snackBar.open(this.errRespon .error.message, 'retry', {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }
}
