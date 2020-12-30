import {ProductModelServer} from './product.model';

export interface CartModelServer {
  total: number;
  data: [
    {
      product: ProductModelServer,
      quantity: number
    }
  ];
}

export interface CartModelReference {
  total: number;
  prodData: [
    {
      id: number,
      inCart: number
    }
  ];
}
