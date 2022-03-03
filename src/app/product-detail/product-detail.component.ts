import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from 'src/app/services/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productDetailService : ProductDetailService, private route : ActivatedRoute) { }

  id : number;

  images : Array<string> = new Array<string>();

  imageMap : Map<string, boolean> = new Map();

  sizes : Array<string> = new Array<string>();

  colors : Array<string> = new Array<string>();

  colorMap : Map<string, boolean> = new Map();

  description : string;

  name : string;

  price : number;

  bigImageSrc : string;


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.id = +params.get('id')!;
      this.handleProductDetails();
    });
  }

  handleProductDetails(){
    this.getProduct();
    this.getProductDetails();
  }

  getProduct(){
    this.productDetailService.getProductInfoById(this.id).subscribe(data => {
      console.log(data);
      this.name = data.name;
      this.description = data.description;
      this.price = data.unitPrice;
    });
  }

  getProductDetails(){
    this.productDetailService.getProductDetailById(this.id).subscribe(data => {
      console.log(data);
      let counter = 0;
      data.forEach(detailItem => {
        if(this.images.indexOf(detailItem.imageUrl1) == -1){
          this.images.push(detailItem.imageUrl1);
          if(counter == 0){
              this.bigImageSrc = detailItem.imageUrl1;
              this.imageMap.set(detailItem.imageUrl1, true);
          }
          else {
            if(!this.imageMap.get(detailItem.imageUrl1)){
              this.imageMap.set(detailItem.imageUrl1, false);
            }
          }
          console.log(this.images[0]);
        }
        if(detailItem.imageUrl2){
          if(this.images.indexOf(detailItem.imageUrl2) == -1){
            this.images.push(detailItem.imageUrl2);
          }
          this.imageMap.set(detailItem.imageUrl2, false);
        }
        if(this.colors.indexOf(detailItem.color) == -1){
          if(counter == 0){
            this.colorMap.set(detailItem.color, true);
          }
          else {
            this.colorMap.set(detailItem.color, false);
          }
          this.colors.push(detailItem.color);
        }
        if(detailItem.unitsInStock != 0){
          this.sizes.push(detailItem.size);
        }
        counter+= 1;
      })
    });
  }

  addBorder(color){
    if(!this.colorMap.get(color)){
      for(let [key, value] of this.colorMap){
        this.colorMap.set(key, false);
      }
      this.colorMap.set(color, true);
    }
    
  }

  changeSource(image : string){
    this.bigImageSrc = image;
    if(!this.imageMap.get(image)){
      for(let [key, value] of this.imageMap){
        this.imageMap.set(key, false);
      }
      this.imageMap.set(image, true);
    }
  }
}
