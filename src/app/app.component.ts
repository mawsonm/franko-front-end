import { IntersectionObserverService } from './services/intersection-observer.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { HomeService } from './services/home.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  animations: [
    trigger('navBar', [
      state(
        'init',
        style({
          opacity: 0,
          transform: 'translateY(-7px)',
        })
      ),
      state(
        'ready',
        style({
          opacity: 1,
          transform: 'translateY(0px)',
        })
      ),
      transition('init => ready', [animate('1s')]),
    ]),
    trigger('logoBar', [
      state(
        'init',
        style({
          opacity: 0,
          transform: 'scale(1.2)',
        })
      ),
      state(
        'ready',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('init => ready', [animate('1s')]),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'diamond';

  home: boolean = false;
  about: boolean = false;
  gallery: boolean = false;
  shop: boolean = false;
  cart: boolean = false;
  account: boolean = false;
  logo: boolean = false;
  addOrRemove: string = '';

  hideNav: boolean = false;

  @ViewChild('nav') nav: ElementRef;

  constructor(
    private intersectionObserverService: IntersectionObserverService,
    private homeService: HomeService,
    private router: Router
  ) {}

  onClickScroll(elementId: string) {
    this.homeService.navSubject.next(elementId);
  }
  ngOnInit() {
    this.animateNav();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url !== '/') {
          this.hideNav = true;
        } else {
          this.hideNav = false;
        }
      }
    });
  }

  onWindowScroll($event) {
    let element = document.querySelector('.navbar') as HTMLElement;

    if (window.pageYOffset > 900) {
      element.classList.remove('top');
    } else {
      element.classList.add('top');
    }

    element.classList.remove('top');
  }

  ngAfterViewInit() {
    this.intersectionObserverService.homeSubject.subscribe((addOrRemove) => {
      this.addOrRemove = addOrRemove;
    });
  }

  animateNav() {
    setTimeout(() => (this.home = !this.home), 1200);
    setTimeout(() => (this.about = !this.about), 1400);
    setTimeout(() => (this.gallery = !this.gallery), 1600);
    setTimeout(() => (this.shop = !this.shop), 1800);
    setTimeout(() => (this.cart = !this.cart), 2000);
    setTimeout(() => (this.account = !this.account), 2200);
    setTimeout(() => (this.logo = !this.logo), 200);
  }

  addOrRemoveNav() {
    if (this.addOrRemove == 'add') {
      return true;
    } else {
      return false;
    }
  }
}
