import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModelServer} from '../models/product.model';
import {CategoryModel} from '../models/category.model';
import {FilterModel} from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/product/products');
  }

  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/product/' + id);
  }

  getProductsFromCategory(cat: CategoryModel): Observable<ProductModelServer[]> {
    const filter = new FilterModel(cat);
    return this.http.post<ProductModelServer[]>(this.SERVER_URL + '/product/filter', filter);
  }


}
