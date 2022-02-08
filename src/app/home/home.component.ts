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
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LottieModule } from 'ngx-lottie';
import { movinWords } from 'movinwords';
import { ProductShow } from '../common/product';

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
export class HomeComponent implements OnInit, AfterViewInit {
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

  products: Array<ProductShow> = new Array<ProductShow>();

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        console.log(product);
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
      console.log(this.products);
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
    this.homeService.navSubject.subscribe((element) => {
      let scrollTo = this.smoothScrollMap.get(element);
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
