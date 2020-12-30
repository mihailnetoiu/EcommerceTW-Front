import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CartModelServer} from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: any[];
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }

  getSingleOrder(userId: number) {
    return this.http.get<CartModelServer>(this.SERVER_URL + '/cart/' + userId).toPromise();
  }

}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}

