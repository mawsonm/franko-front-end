import { IntersectionObserverService } from './../services/intersection-observer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChildren, AfterViewInit, ElementRef, ViewChild, QueryList, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LottieModule } from 'ngx-lottie';
import { movinWords } from 'movinwords';

@Component({
  selector: 'app-home',
  animations: [
    trigger('heroText', [
      state('init', style({
        opacity: 0,
      })),
      state('ready', style({
        opacity: 1
      })),
      transition('init => ready', [
        animate('1s')
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit, AfterViewInit {

  faArrow = faArrowLeft;

  // hero stuff

  heroUrl : string = '../../assets/videos/slow-steak.mp4';
  muted: boolean = true;
  heroTextFade : boolean = false;

  // ae animation

  options: AnimationOptions = {
    path: "../../assets/ae-animations/data.json"
  }
  ai: any;



  @ViewChildren('bottomGallery') bottomGallery : QueryList<ElementRef>;
  @ViewChildren('about') about : QueryList<ElementRef>;
  @ViewChildren('topGallery') topGallery : QueryList<ElementRef>;
  @ViewChild('forNav') forNav : ElementRef;
  constructor(private homeService: HomeService, private intersectionService : IntersectionObserverService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*this.homeService.getInstagramInfo().subscribe(it => {
      this.instaInfo.bio = it.data.biography;
      console.log(this.instaInfo.bio);
      this.instaInfo.pic_url = "../../assets/images/insta_profile.jpg";
      this.instaInfo.username = "_frankie_diamond";
    });*/
    setTimeout(() => this.heroTextFade = !this.heroTextFade, 1200);
  }

  ngAfterViewInit(){
    this.intersectionService.onScrollBottomGallery(this.bottomGallery.toArray());
    this.intersectionService.onScrollAbout(this.about.toArray());
    this.intersectionService.onScrollTopGallery(this.topGallery.toArray());
  }

  animationCreated(animationItem: AnimationItem): void {
    this.ai = animationItem;
  }
}
