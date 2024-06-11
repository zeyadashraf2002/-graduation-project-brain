import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { UserService } from 'src/app/Services/user.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-rating',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() maxRating=5;
  maxRatingArr:any=[];
  @Output()
  onRating:EventEmitter<number>=new EventEmitter<number>()
  @Input() SelectedStar:number=0;
  previousSelection:number=0;
  constructor(public dialog: MatDialog){
    // this._UserService.getResModel().subscribe((data)=>{
    //  console.log(data);
    //   //let z=JSON.parse(data);
    //  //console.log(z);
    // //this.resModel=z.prediction;
    // });
  }
  ngOnInit(): void {
    this.maxRatingArr=Array(this.maxRating).fill(0);
  }
      HandelMouseEnter(index:number){
     this.SelectedStar=index+1;
    }

    HandelEnter(index:number){
     this.SelectedStar=index+1;
    }
   HandelMouseLeave(){
      if(this.previousSelection!==0){
        this.SelectedStar=this.previousSelection
      }
      else{
        this.SelectedStar=0
      }
    }
  Rating(index:number){
    this.SelectedStar=index+1;
    this.previousSelection=this.SelectedStar;
    this.onRating.emit(this.SelectedStar+1);
    console.log(this.SelectedStar);
  }

}
