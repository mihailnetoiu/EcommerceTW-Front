import { Component, OnInit } from '@angular/core';
import {WishlistService} from '../../services/wishlist.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(public wishlistService: WishlistService,
              public cartService: CartService) { }

  ngOnInit(): void {
  }

}
