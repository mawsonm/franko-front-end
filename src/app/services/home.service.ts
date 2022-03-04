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

  getInstagramInfo(): any {
    var options = new HttpHeaders()
      .append('x-rapidapi-host', 'instagram85.p.rapidapi.com')
      .append(
        'x-rapidapi-key',
        'ac950bfb9cmsha4e84c1a2ec807fp1fe287jsn58591b9e28f1'
      );
    return this.http.get(
      'https://instagram85.p.rapidapi.com/account/_frankie_diamond/info',
      { headers: options }
    );
  }

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
