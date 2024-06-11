import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { DoctorData } from '../models/doctorData';
// import {UserData} from'src/app/models/userData';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  httpOption;
  httpOption1;
  constructor(public _HttpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.httpOption1 = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  //doctorData=new BehaviorSubject(null);

  uploadImage(image: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseApi}/user/scan/upload`,
      image,
      this.httpOption1
    );
  }

  /* Home or Home-Patient :
  To Display top rating doctor */
  getTopRating(): Observable<any> {
    return this._HttpClient.get(`${environment.baseApi}/doctor/all`);
  }

  /*    nav-bar component: 
    to Get Doctor Profile and Display it in doctor-profile component  */
  getProfileDoc(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseApi}/doctor/Profile`,
      this.httpOption
    );
  }

  // saveDoctorData(docData:any)
  // {
  //   this.doctorData.next(docData);

  // }

  /* Start edit appoint component */
  getAllAppoint(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseApi}/appointment`,
      this.httpOption
    );
  }
  acceptAppoint(id: any): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseApi}/appointment/${id}/confirm`,
      { appointmentId: id },
      this.httpOption
    );
  }
  cancelAppoint(id: any): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseApi}/appointment/${id}/cancel`,
      {},
      this.httpOption
    );
  }
  getComingAppoint(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseApi}/doctor/confirmed/appointments`,
      this.httpOption
    );
  }
  /* End edit appoint component */
  addMedHistory(formData: any): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseApi}/medicalHistory/add`,
      formData,
      this.httpOption
    );
  }
  addNotes(formOfNote: any): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseApi}/medicalHistory/addNote`,
      formOfNote,
      this.httpOption
    );
  }
  sendAvAppoint(data: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseApi}/doctor/slots1`,
      data,
      this.httpOption
    );
  }
  editDocProfile(formEdited: any): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseApi}/doctor/updateProfile`,
      formEdited,
      this.httpOption
    );
  }
}
