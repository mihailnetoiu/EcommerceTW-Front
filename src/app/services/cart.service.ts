import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {HistoryService} from './history.service';
import {environment} from '../../environments/environment';
import {CartModelReference, CartModelServer, InternalCardModel} from '../models/cart.model';
import {BehaviorSubject} from 'rxjs';
import {NavigationExtras, Router} from '@angular/router';
import {ProductModelServer} from '../models/product.model';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

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
              private historyService: HistoryService,
              private router: Router,
              private toast: ToastrService,
              private spinner: NgxSpinnerService) {

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
          } else {
            this.cartDataServer.data.push({
              quantity: p.inCart,
              product: actualProduct
            });
          }
          this.updateLocalStorage();
        });
      });
    }
  }

  addProductToCart(id: number, quantity?: number) {
    this.productService.getSingleProduct(id).subscribe(prod => {
      if (!this.cartDataServer.data[0].product) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].quantity = quantity !== undefined ? quantity : 1;

        this.cartDataServer.total +=
          this.calculateSalePrice(
            this.cartDataServer.data[0].product.price, this.cartDataServer.data[0].product.sale) * this.cartDataServer.data[0].quantity;

        this.cartDataClient.prodData[0].inCart = this.cartDataServer.data[0].quantity;
        this.cartDataClient.prodData[0].id = prod.id;
        this.updateLocalStorage();
        this.showSuccessToaster(`${prod.name} added to the cart`, 'Product Added');
      } else {
        const index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);
        if (index !== -1) {
          if (quantity && quantity <= prod.quantity) {
            this.cartDataServer.data[index].quantity = this.cartDataServer.data[index].quantity < prod.quantity ? quantity : prod.quantity;
          } else {
            this.cartDataServer.data[index].quantity =
              this.cartDataServer.data[index].quantity < prod.quantity ? this.cartDataServer.data[index].quantity + 1 : prod.quantity;
          }
          this.cartDataClient.prodData[index].inCart = this.cartDataServer.data[index].quantity;

          this.calculateTotal();
          this.updateLocalStorage();
          this.showInfoToaster(`${prod.name} quantity updated in the cart`, 'Product Updated');
        } else {
          this.cartDataServer.data.push({
            quantity: 1,
            product: prod
          });

          this.cartDataClient.prodData.push({
            inCart: 1,
            id: prod.id
          });

          this.calculateTotal();
          this.showSuccessToaster(`${prod.name} added to the cart`, 'Product Added');
          this.updateLocalStorage();
        }
      }
    });
  }

  updateLocalStorage() {
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    this.cartData$.next({...this.cartDataServer});
  }

  updateCartItems(index: number, increase: boolean) {
    const data = this.cartDataServer.data[index];
    if (increase) {
      if (data.quantity < data.product.quantity) {
        ++data.quantity;
      }
      this.cartDataClient.prodData[index].inCart = data.quantity;
      this.updateLocalStorage();
    } else {
      data.quantity--;
      if (data.quantity < 1) {
        this.cartData$.next({...this.cartDataServer});
      } else {
        this.cartDataClient.prodData[index].inCart = data.quantity;
        this.updateLocalStorage();
      }
    }
  }

  deleteProductFromCart(index: number) {
    if (window.confirm('Are you sure you want to remove the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.cartDataClient.total = this.cartDataServer.total;
      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {
          total: 0,
          prodData: [{
            inCart: 0,
            id: 0
          }]
        };
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      if (this.cartDataServer.total === 0) {
        this.resetServerData();
      }
      this.cartData$.next({...this.cartDataServer});
    }
  }

  private calculateTotal() {
    let total = 0;
    this.cartDataServer.data.forEach(p => {
      const {quantity} = p;
      const {price} = p.product;
      const {sale} = p.product;

      total += this.calculateSalePrice(price, sale) * quantity;
    });
    this.cartDataServer.total = total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  async checkoutFromCart(userId: number) {
    this.resetServerData();
    this.cartData$.next({...this.cartDataServer});

    // history in db
    let internalHistory;
    for (const item of this.cartDataClient.prodData) {
      internalHistory = new InternalCardModel(userId, item.inCart, item.id);
      await this.http.post(`${this.SERVER_URL}/history/save`, internalHistory);
    }

    const navigationExtras: NavigationExtras = {
      state: {
        message: 'Thanks for you purchase!',
        total: this.cartDataClient.total,
      }
    };

    this.spinner.hide();

    this.router.navigate(['/thankyou'], navigationExtras).then(p => {
      this.resetClientData();
      this.cartTotal$.next(0);
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    });
  }

  private resetClientData() {
    this.cartDataClient = {
      total: 0,
      prodData: [{
        inCart: 0,
        id: 0
      }]
    };
  }

  private resetServerData() {
    this.cartDataServer = {
      total: 0,
      data: [{
        quantity: 0,
        product: undefined
      }]
    };
  }

  private showSuccessToaster(message, title) {
    this.toast.success(
      message,
      title,
      {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-left'
      }
    );
  }

  private showInfoToaster(message, title) {
    this.toast.info(
      message,
      title,
      {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-left'
      }
    );
  }

  private calculateSalePrice(price: number, sale: number) {
    return price - (price * sale / 100);
  }
}
