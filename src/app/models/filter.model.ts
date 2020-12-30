import {CategoryModel} from './category.model';

export class FilterModel {
  category: CategoryModel;
  price: number;
  isAscending: boolean;
  rating: number;

  constructor(category?: CategoryModel, price?: number, isAscending?: boolean, rating?: number) {
    this.category = category;
    this.price = price;
    this.isAscending = isAscending;
    this.rating = rating;
  }
}
