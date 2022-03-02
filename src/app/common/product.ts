export class Product {
  id : number;
  name : string;
  description: string;
  unitPrice : number;
  unitsInStock : number;
  dateCreated : Date;
  lastUpdated : Date;
}

export class ProductDetail {
  detailId : number;
  size : string;
  color: string;
  unitsInStock : number;
  imageUrl1 : string;
  imageUrl2 : string;
  dateCreated : Date;
  lastUpdated : Date;
}

export class ProductShow {
  id : number;
  name : string;
  unitPrice : number;
  sizes : Array<string> = new Array<string>();
  colors : Array<string> = new Array<string>();
  imageUrl1 : string;
  imageUrl2 : string;
}

export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

export interface GetResponseProduct {
  _embedded: {
    product: Product;
  }
}

export interface GetResponseProductDetails {
  _embedded: {
    productDetail: ProductDetail[];
  }
}
