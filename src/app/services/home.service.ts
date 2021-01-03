import {Injectable} from '@angular/core';
import {WishlistService} from './wishlist.service';
import {Router} from '@angular/router';
import {CartService} from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(public wishlistService: WishlistService,
              private router: Router,
              private cartService: CartService) {
  }

  selectProduct(id) {
    this.router.navigate(['/product', id]).then();
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id);
  }

  addToWishlist(id: number) {
    this.wishlistService.addToWishlist(id);
  }
}
