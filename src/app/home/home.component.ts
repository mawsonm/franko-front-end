import { IntersectionObserverService } from './../services/intersection-observer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChildren, AfterViewInit, ElementRef, ViewChild, QueryList } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {

  faArrow = faArrowLeft;

  heroUrl : string = '../../assets/videos/slow-steak.mp4';
  compilationUrl : string = "../../assets/videos/compilation.mp4";
  muted: boolean = true;

  heroTextFade : boolean = false;

  options: AnimationOptions = {
    path: "../../assets/ae-animations/data.json"
  }

  ai: any;



  galleryUrl : string = "../../assets/videos/suky.gif";

  instaInfo = {} as InstaInfo;


  @ViewChildren('gallery') gallery : QueryList<ElementRef>;
  @ViewChildren('about') about : QueryList<ElementRef>;
  @ViewChildren('quote') quote : QueryList<ElementRef>;
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
    console.log(this.gallery.toArray());
    this.intersectionService.onScrollContent(this.gallery.toArray());
    this.intersectionService.onScrollAbout(this.about.toArray());
    this.intersectionService.onScrollQuote(this.quote.toArray());
    /*this.gallery.forEach(item => {
      this.intersectionService.onScrollContent(item);
    });*/
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

interface InstaInfo {
  pic_url : string;
  bio: string;
  username: string;
}
