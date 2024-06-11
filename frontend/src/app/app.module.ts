import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HomePatientComponent } from './Components/homeForPatient/home-patient/home-patient.component';
import { HomeDoctorComponent } from './Components/homeForDoctor/home-doctor/home-doctor.component';
import { DoctorAppointmentComponent } from './Components/doctor-appointment/doctor-appointment.component';
import { DoctorProfileComponent } from './Components/doctor-profile/doctor-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ResultComponent } from './Components/result/result.component';
import { UploadPhotoComponent } from './Components/upload-photo/upload-photo.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { EditDocProfileComponent } from './Components/edit-doc-profile/edit-doc-profile.component';
import { PatientProfileComponent } from './Components/patient-profile/patient-profile.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { SplashScreenComponent } from './Components/splash-screen/splash-screen.component';
import { EditAppoientmentComponent } from './edit-appoientment/edit-appoientment.component';
import { AboutSiteComponent } from './about-site/about-site.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
//import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePatientComponent,
    HomeDoctorComponent,
    LoginComponent,
    SignupComponent,
    DoctorAppointmentComponent,
    DoctorProfileComponent,
    NavBarComponent,
    MainLayoutComponent,
    ResultComponent,
    UploadPhotoComponent,
    EditDocProfileComponent,
    PatientProfileComponent,
    SplashScreenComponent,
    EditAppoientmentComponent,
    AboutSiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    FileUploadModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    NgxMatFileInputModule,
    MatNativeDateModule,
    MatDialogModule,
    DatePipe,
    MatChipsModule,
    // NgbCarouselModule
    //NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
