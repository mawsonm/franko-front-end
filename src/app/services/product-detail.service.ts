import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetResponseProduct, GetResponseProductDetails, GetResponseProducts, Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:8080/api";

  getProductDetailById(id : number){
    return this.http.get<GetResponseProductDetails>(`${this.baseUrl}/product-detail/search/findByProductId?product_id=${id}`).pipe(
      map(response => response._embedded.productDetail)
    );
  }

  getProductInfoById(id : number){
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
