import {CategoryModel} from './category.model';

export interface ProductModelServer {
  id: number;
  name: string;
  category: CategoryModel;
  description: string;
  price: number;
  quantity: number;
  photo: string;
  stars: number;
  sale: number;
  reviews: any[];
}
