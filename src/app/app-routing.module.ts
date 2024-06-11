import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { HomePatientComponent } from './Components/homeForPatient/home-patient/home-patient.component';
import { HomeDoctorComponent } from './Components/homeForDoctor/home-doctor/home-doctor.component';
import { DoctorAppointmentComponent } from './Components/doctor-appointment/doctor-appointment.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { DoctorProfileComponent } from './Components/doctor-profile/doctor-profile.component';
import { ResultComponent } from './Components/result/result.component';
import { UploadPhotoComponent } from './Components/upload-photo/upload-photo.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { PatientProfileComponent } from './Components/patient-profile/patient-profile.component';
import { EditDocProfileComponent } from './Components/edit-doc-profile/edit-doc-profile.component';
import { AuthGuard } from './Gaurds/auth.guard';
import { EditAppoientmentComponent } from './edit-appoientment/edit-appoientment.component';
import { AboutSiteComponent } from './about-site/about-site.component';
const routes: Routes = [
  {
    path: '', component: MainLayoutComponent , children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home/patient', component: HomePatientComponent},
      { path: 'home/doctor', component: HomeDoctorComponent},
      { path: 'appoint/doctor/:dID', component: DoctorAppointmentComponent},
      { path: 'profile/doctor/:docID', component: DoctorProfileComponent},
      { path: 'profile/patient', component: PatientProfileComponent},
      { path: 'profile/Patient/:pID', component: EditAppoientmentComponent},
      { path: 'profile/Doctor/edit', component: EditDocProfileComponent},
      // { path: 'appoint/Doctor/edit', component: EditAppoientmentComponent},
      { path: 'upload', component: UploadPhotoComponent},
      // { path: 'result', component: ResultComponent},
      {path:'about',component:AboutSiteComponent}
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path:'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//canActivate:[AuthGuard]