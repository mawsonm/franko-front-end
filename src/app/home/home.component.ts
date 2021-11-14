import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LottieModule } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  animations: [
    trigger('heroText', [
      state('init', style({
        opacity: 0,
        //transform: 'translateX(100%)'
      })),
      state('ready', style({
        opacity: 1,
        //transform: 'translateX(0%)'
      })),
      transition('init => ready', [
        animate('1s')
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  vidUrl : string = '../../assets/videos/slow-steak.mp4';
  muted: boolean = true;

  heroTextFade : boolean = false;

  options: AnimationOptions = {
    path: "../../assets/ae-animations/data.json"
  }

  ai: any;


  constructor(homeService : HomeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => this.heroTextFade = !this.heroTextFade, 1200);
  }


  transformNav(event : any) {
    if(window.pageYOffset > 100 ){

    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    this.ai = animationItem;
  }
}