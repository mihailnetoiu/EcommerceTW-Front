import {ProductModelServer} from './product.model';

export interface WishlistModel {
  wishlistTotal: number;
  data: Array<ProductModelServer>;
}
