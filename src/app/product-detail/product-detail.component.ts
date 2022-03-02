import { Component, OnInit } from '@angular/core';
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

  sizes : Array<string> = new Array<string>();

  colors : Array<string> = new Array<string>();

  description : string;

  name : string;

  price : number;

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
      data.forEach(detailItem => {
        if(this.images.indexOf(detailItem.imageUrl1) == -1){
          this.images.push(detailItem.imageUrl1);
          console.log(this.images[0]);
        }
        if(detailItem.imageUrl2){
          if(this.images.indexOf(detailItem.imageUrl2) == -1){
            this.images.push(detailItem.imageUrl2);
          }
        }
        if(this.colors.indexOf(detailItem.color) == -1){
          this.colors.push(detailItem.color);
        }
        if(detailItem.unitsInStock != 0){
          this.sizes.push(detailItem.size);
        }
      })
    });
  }

}
