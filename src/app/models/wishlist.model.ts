import {ProductModelServer} from './product.model';

export interface WishlistModel {
  productNumber: number;
  data: [
    {
      product: ProductModelServer,
    }
  ];
}
