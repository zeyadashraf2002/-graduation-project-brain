import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
windowWidth: any;
showSplash:boolean = true;
color: ThemePalette = 'accent';
constructor(){}

ngOnInit(): void {
    setTimeout(() => {
      this.windowWidth = "-" + window.innerWidth + "px";

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, 500);
    }, 9000);
  }
}
