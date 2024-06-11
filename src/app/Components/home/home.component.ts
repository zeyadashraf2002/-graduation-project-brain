import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Services/doctor-service.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  IsWait: boolean = true;
  starRating = 0;
  topDoctor: any = [];
  backgroundUrl: any = 'assets/home/Vector.png';
  @Input() maxRating = 5;
  maxRatingArr: any = [];
  @Output()
  onRating: EventEmitter<number> = new EventEmitter<number>();
  @Input() SelectedStar: number = this.topDoctor.totalRate;
  previousSelection: number = 0;
  rateStar: any = [];
  constructor(private _DoctorService: DoctorService) {}
  ngOnInit(): void {
    this._DoctorService.getTopRating().subscribe({
      next: (data) => {
        this.IsWait = false;
        this.topDoctor = data.doctors;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    //  for (let i = 0; i < this.topDoctor.length; i++) {
    //    let x = this.topDoctor[i];
    //    console.log(x);
    //  }
    //this.maxRatingArr=Array(this.maxRating).fill(0);
    this.rateStar = this.topDoctor.totalRate;
    console.log(this.rateStar);
    //this.x=this.topDoctor.length();
    //console.log(this.x);
  }

  HandelMouseEnter(index: number) {
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
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
      this.SelectedStar = index + 1;
      this.previousSelection = this.SelectedStar;
      this.onRating.emit(this.SelectedStar + 1);
    } else {
      this.SelectedStar = 0;
    }
  }
  Handel(event: any) {
    alert(`Your rate is ${event}`);
  }
}
