import {environment} from '../../environments/environment';
import {WishlistModel} from '../models/wishlist.model';
import {HttpClient} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {ProductModelServer} from '../models/product.model';
import {ProductService} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private SERVER_URL = environment.SERVER_URL;
  private cache = new Map();
  wishlist: WishlistModel = {
    wishlistTotal: 0,
    data: Array()
  };

  constructor(private http: HttpClient,
              private productService: ProductService) {
    // TODO modify for current user
    let wishlistArray: ProductModelServer[];
    this.http.get(`${this.SERVER_URL}/wishlist/1`).toPromise().then((result: ProductModelServer[]) => {
      wishlistArray = result;
      this.wishlist.wishlistTotal = wishlistArray.length;
      this.wishlist.data.splice(0, 1);
      wishlistArray.forEach((prod: ProductModelServer) => this.wishlist.data.push(prod));
      this.cache.set(1, true);
    });
  }

  // TODO FIX FOR USER LOGIN
  addToWishlist(productId): void {
    this.http.post(`${this.SERVER_URL}/wishlist/1/${productId}`, null).toPromise().then();
    let currentProduct: ProductModelServer;
    this.productService.getSingleProduct(productId).toPromise().then((prod: ProductModelServer) => {
      currentProduct = prod;
      if (!this.checkProductInWishlist(prod.id)) {
        this.wishlist.data.push(
          currentProduct
        );
        this.wishlist.wishlistTotal++;
        this.cache.set(1, false);
      }
    });
  }

  checkProductInWishlist(productId): boolean {
    return this.wishlist.data.some((item) => item.id === productId);
  }

  getProductArrayId(productId): number {
    let counter = 0;
    for (const product of this.wishlist.data) {
      if (product.id === productId) {
        return counter;
      }
      ++counter;
    }
  }

  deleteProductFromWishlist(id: number) {
    this.cache.set(1, false);
    this.http.delete(`${environment.SERVER_URL}/wishlist/1/${id}`).toPromise().then(() => {
      const prodNumber = this.getProductArrayId(id);
      this.wishlist.data.splice(prodNumber, 1);
      this.wishlist.wishlistTotal--;
    });
  }

  deleteAllProducts() {
    this.cache.set(1, false);
    this.http.delete(`${environment.SERVER_URL}/wishlist/1`).toPromise().then(() => {
      this.wishlist.data = Array();
      this.wishlist.wishlistTotal = 0;
    });
  }
}
