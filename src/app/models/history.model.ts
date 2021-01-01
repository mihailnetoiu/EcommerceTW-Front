import {ProductModelServer} from './product.model';

export interface HistoryModel {
  quantity: number;
  product: ProductModelServer;
  purchaseDate: string;
}
