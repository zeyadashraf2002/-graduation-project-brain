import { Component,OnInit } from '@angular/core';
//import * as $ from 'jquery';
//import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-about-site',
  templateUrl: './about-site.component.html',
  styleUrls: ['./about-site.component.scss']
})
export class AboutSiteComponent implements OnInit  {
  backgroundUrl:string='assets/home/Vector.png';
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(){
   //console.log ($('abdo').width());
  }
  ngOnInit(): void {
    // (<any>$(document)).ready(()=>{
    //   (<any>$(".skitter-large")).skitter({interval:1000 , auto_play:false});
    
    
    //  // (<any> $(".owl-carousel")).owlCarousel({margin:30 , items:2});
    //   //return
    // });
  }

}
