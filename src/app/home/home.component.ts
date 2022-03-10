import { IntersectionObserverService } from './../services/intersection-observer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  ElementRef,
  ViewChild,
  QueryList,
  Input,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LottieModule } from 'ngx-lottie';
import { movinWords } from 'movinwords';
import { ProductShow } from '../common/product';
import { filter, pairwise } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  animations: [
    trigger('heroText', [
      state(
        'init',
        style({
          opacity: 0,
        })
      ),
      state(
        'ready',
        style({
          opacity: 1,
        })
      ),
      transition('init => ready', [animate('1s')]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // hero stuff

  heroUrl: string = '../../assets/videos/slow-steak.mp4';
  muted: boolean = true;
  heroTextFade: boolean = false;

  // ae animation

  options: AnimationOptions = {
    path: '../../assets/ae-animations/data.json',
  };
  ai: any;

  smoothScrollMap = new Map();

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    centerInsufficientSlides: true,
    centeredSlides: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  products: Array<ProductShow> = new Array<ProductShow>();

  subscription: Subscription;

  innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  @ViewChildren('bottomGallery') bottomGallery: QueryList<ElementRef>;
  @ViewChildren('about') about: QueryList<ElementRef>;
  @ViewChildren('topGallery') topGallery: QueryList<ElementRef>;
  @ViewChild('forNav') forNav: ElementRef;
  @ViewChild('homeSection') homeSection: ElementRef;
  @ViewChild('aboutSection') aboutSection: ElementRef;
  @ViewChild('gallerySection') gallerySection: ElementRef;
  @ViewChild('shopSection') shopSection: ElementRef;
  constructor(
    private homeService: HomeService,
    private intersectionService: IntersectionObserverService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getProductDetails();
    setTimeout(() => (this.heroTextFade = !this.heroTextFade), 1200);
  }

  getProductDetails() {
    this.homeService.getProducts().subscribe((data) => {
      data.forEach((product) => {
        var prod = new ProductShow();
        prod.id = product.id;
        prod.name = product.name;
        prod.unitPrice = product.unitPrice;
        this.homeService.getProductDetails(product.id).subscribe((details) => {
          details.forEach((item) => {
            prod.colors.push(item.color);
            if (item.unitsInStock != 0) {
              prod.sizes.push(item.size);
            }
            prod.imageUrl1 = item.imageUrl1;
            if (item.imageUrl2) {
              prod.imageUrl2 = item.imageUrl2;
            }
          });
          prod.colors = prod.colors.filter((v, i, a) => a.indexOf(v) === i);
          this.products.push(prod);
        });
      });
    });
  }

  ngAfterViewInit() {
    this.intersectionService.onScrollBottomGallery(
      this.bottomGallery.toArray()
    );
    this.intersectionService.onScrollAbout(this.about.toArray());
    this.intersectionService.onScrollTopGallery(this.topGallery.toArray());
    this.intersectionService.onScrollNav(this.homeSection);
    this.smoothScrollMap.set('home', this.homeSection);
    this.smoothScrollMap.set('about', this.aboutSection);
    this.smoothScrollMap.set('gallery', this.gallerySection);
    this.smoothScrollMap.set('shop', this.shopSection);
    this.subscription = this.homeService.navSubject.subscribe((element) => {
      console.log('element', element);
      let scrollTo = this.smoothScrollMap.get(element);
      console.log('scrollTo', scrollTo);
      scrollTo.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    this.ai = animationItem;
  }
}
