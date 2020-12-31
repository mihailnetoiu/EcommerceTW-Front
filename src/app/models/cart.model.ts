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

export class InternalCartModel {
  userId: number;
  quantity: number;
  productId: number;

  constructor(userId, quantity, productId) {
    this.userId = userId;
    this.quantity = quantity;
    this.productId = productId;
  }
}
