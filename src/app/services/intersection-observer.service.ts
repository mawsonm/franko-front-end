import { ElementSchemaRegistry } from '@angular/compiler';
import { ElementRef, Injectable, QueryList } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {

  galleryObserver : IntersectionObserver;
  aboutObserver : IntersectionObserver;
  quoteObserver : IntersectionObserver;
  navObserver : IntersectionObserver;

  constructor() { }

  onScrollBottomGallery(elements: ElementRef[]){
    const options = {
      root: null,
      threshhold: 0
    }
    this.galleryObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        console.log(entry);
        if(!entry.isIntersecting){
          return;
        }
        else {
          entry.target.classList.add("appear");
          this.galleryObserver.unobserve(entry.target);
        }
      });
    }, options);
    elements.forEach(element => {
      this.galleryObserver.observe(element.nativeElement);
    })
    return this.galleryObserver;
  }

  onScrollTopGallery(elements: ElementRef[]){
    const options = {
      root: null,
      threshhold: 1
    }
    this.quoteObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(!entry.isIntersecting){
          return
        }
        else {
          entry.target.classList.add('top-row');
          this.quoteObserver.unobserve(entry.target);
        }
      });
    }, options);
    elements.forEach(element => {
      this.quoteObserver.observe(element.nativeElement);
    });
  }

  onScrollAbout(elements: ElementRef[]) {
    const options = {
      root: null,
      threshold: 0.2
    }

    this.aboutObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if(!entry.isIntersecting){
          return;
        }
        else {
          entry.target.classList.add('left-right')
          this.aboutObserver.unobserve(entry.target);
        }
      })
    }, options)
    elements.forEach(element => {
      this.aboutObserver.observe(element.nativeElement);
    })
  }

}
