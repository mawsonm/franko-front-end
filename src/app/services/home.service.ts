import {
  GetResponseProductDetails,
  GetResponseProducts,
  Product,
  ProductDetail,
} from './../common/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  navSubject = new Subject();

  baseUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(`${this.baseUrl}/products`)
      .pipe(map((response) => response._embedded.products));
  }

  getProductDetails(productId: number) {
    return this.http
      .get<GetResponseProductDetails>(
        `${this.baseUrl}/product-detail/search/findByProductId?product_id=${productId}`
      )
      .pipe(map((response) => response._embedded.productDetail));
  }
}
