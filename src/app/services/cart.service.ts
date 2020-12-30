import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {OrderService} from './order.service';
import {environment} from '../../environments/environment';
import {CartModelReference, CartModelServer} from '../models/cart.model';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ProductModelServer} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private SERVER_URL = environment.SERVER_URL;
  private cartDataClient: CartModelReference = {
    total: 0,
    prodData: [{
      inCart: 0,
      id: 0
    }]
  };

  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      quantity: 0,
      product: undefined
    }]
  };

  /* OBSERVABLES --> SUBSCRIBE*/
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private http: HttpClient,
              private productService: ProductService,
              private orderService: OrderService,
              private router: Router) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    const info = JSON.parse(localStorage.getItem('cart'));
    if (info && info.prodData[0].inCart) {
      this.cartDataClient = info;
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProduct: ProductModelServer) => {
          if (this.cartDataServer.data[0].quantity === 0) {
            this.cartDataServer.data[0].quantity = p.inCart;
            this.cartDataServer.data[0].product = actualProduct;
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              quantity: p.inCart,
              product: actualProduct
            });
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({...this.cartDataServer});
        });
      });
    }
  }
}
