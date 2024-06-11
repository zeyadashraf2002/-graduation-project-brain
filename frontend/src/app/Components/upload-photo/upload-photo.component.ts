import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { DoctorService } from '../../Services/doctor-service.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
//let resutlOfModel;
const URL = `${environment.baseApi}/user/uploadAndAnalysis`;
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {
  imgView: any;
  resModel: any;
  imgDone: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  backgroundUrl: string = 'assets/home/Vector.png';
  topDoctor: any = [];
  IsWait: boolean = true;
  isUploaded: boolean = false;
  file: any = null;
  loading: boolean = true;
  isScanning: boolean = false;
  constructor(
    private _ToastrService: ToastrService,
    private _DoctorService: DoctorService,
    private _Router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  handleChangeImage(e: any): void {
    const file = e.target.files[0];
    const imgUrl = window.URL.createObjectURL(file);
    this.imgView = imgUrl;
    this.file = file;
  }

  handleUploadImage(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('image', this.file);
      this.imgDone = true;

      this._DoctorService.uploadImage(formData).subscribe({
        next: (data) => {
          this.resModel = data?.analysisResult?.prediction;
          this.imgDone = false;
          this.isUploaded = true;
          this.loading = false;
          this.isScanning = true;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  openSnackBar() {
    this._snackBar.open(this.resModel, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openDocProfile(docID: number) {
    return this._Router.navigate(['/appoint', 'doctor', docID]);
  }
}
