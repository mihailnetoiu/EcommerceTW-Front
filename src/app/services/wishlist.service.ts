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
    productNumber: 0,
    data: [
      {
        product: undefined,
      }
    ]
  };

  constructor(private http: HttpClient,
              private productService: ProductService) {
    // TODO modify for current user
    let wishlistArray: ProductModelServer[];
    this.http.get(`${this.SERVER_URL}/wishlist/1`).toPromise().then((result: ProductModelServer[]) => {
      wishlistArray = result;
      this.wishlist.productNumber = wishlistArray.length;
      this.wishlist.data.splice(0, 1);
      wishlistArray.forEach((prod: ProductModelServer) => this.wishlist.data.push({
        product: prod
      }));
      this.cache.set(1, true);
    });
  }

  // TODO FIX FOR USER LOGIN
  addToWishlist(productId): void {
    this.http.post(`${this.SERVER_URL}/wishlist/1/${productId}`, null).toPromise().then();
    let currentProduct: ProductModelServer;
    this.productService.getSingleProduct(productId).toPromise().then((prod: ProductModelServer) => {
      currentProduct = prod;
      this.wishlist.data.push({
        product: currentProduct
      });
    });
    this.wishlist.productNumber++;
    this.cache.set(1, false);
  }

  checkProductInWishlist(productId): boolean {
    return this.wishlist.data.some((item) => item.product.id === productId);
  }
}
