import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOption;

  //resModel = new BehaviorSubject(null);
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
  }

  /*   
   start nav-Bar component section 
  to search for doctors and Display it in patient-profile component
*/
  search(input: string): Observable<any> {
    let send = { name: input };
    return this._HttpClient.post(
      `${environment.baseApi}/doctor/search`,
      JSON.stringify(send),
      this.httpOption
    );
    //  .pipe(
    //    retry(1), //try send request 1 time
    //    catchError(()=>{
    //     return throwError(()=>'There is no doctors')
    //    })
    //  );
  }

  /*end nav-Bar component section*/

  getPatientProfile(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseApi}/user/profile`,
      this.httpOption
    );
  }
  getPatientByID(pID: any): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseApi}/user/getUserById/${pID}`,
      this.httpOption
    );
  }
  /* start doctorAppointment component section  */
  getDocByID(dID: any): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseApi}/user/doctor/${dID}`,
      this.httpOption
    );
  }
  /* end doctorAppointment component section  */

  bookAppoint(date: any, doctorId: any): Observable<any> {
    let send = { date, doctorId };
    //console.log(send);
    return this._HttpClient.post(
      `${environment.baseApi}/appointment`,
      JSON.stringify(send),
      this.httpOption
    );
  }

  sendRate(rateData: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseApi}/review/add`,
      rateData,
      this.httpOption
    );
  }
  /*mazen */
  getResModel(img: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseApi}/user/uploadAndAnalysis`,
      this.httpOption
    );
  }
}
