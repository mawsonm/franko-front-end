import { IntersectionObserverService } from './services/intersection-observer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  animations: [
    trigger('navBar', [
      state('init', style({
        opacity: 0,
        transform: 'translateY(-7px)'
      })),
      state('ready', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      transition('init => ready', [
        animate('1s')
      ])
    ]),
    trigger('logoBar', [
      state('init', style({
        opacity: 0,
        transform: 'scale(1.2)'
      })),
      state('ready', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('init => ready', [
        animate('1s')
      ])
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'diamond';

  home: boolean = false;
  about: boolean = false;
  gallery : boolean = false;
  shop : boolean = false;
  account : boolean = false;
  logo: boolean = false;

  constructor(private intersectionObserverService : IntersectionObserverService){}

  ngOnInit(){
    this.animateNav();
  }

  onWindowScroll($event){
    let element = document.querySelector('.navbar') as HTMLElement;
    console.log(window.pageYOffset);
    if(window.pageYOffset > 900){
      element.classList.remove('top');
    }
    else {
      element.classList.add('top');
    }
  }

  ngAfterViewInit(){
  }

  animateNav(){
    setTimeout(() => this.home = !this.home, 1200);
    setTimeout(() => this.about = !this.about, 1400);
    setTimeout(() => this.gallery = !this.gallery, 1600);
    setTimeout(() => this.shop = !this.shop, 1800);
    setTimeout(() => this.account = !this.account, 2000);
    setTimeout(() => this.logo = !this.logo, 200);
  }

  transformNav(){
    let navbar = document.getElementById('navbar');
    let scrolled = false;
    if(window.pageYOffset > 100){
      navbar?.classList.remove('top');
      if(!scrolled){
          navbar?.style.transform == 'translateY(-70px)';
      }
      setTimeout(function() {
         navbar?.style.transform == 'translateY(0)';
          scrolled = true;
      }, 200)
  }
  else {
      navbar?.classList.add('top');
      scrolled = false;
  }
}
}
