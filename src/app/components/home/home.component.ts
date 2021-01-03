import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductModelServer} from '../../models/product.model';
import {CartService} from '../../services/cart.service';
import {WishlistService} from '../../services/wishlist.service';
import {HomeService} from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(
    private productService: ProductService,
    public homeService: HomeService
    ) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response: ProductModelServer[]) => {
        this.products = response;
      }
    );
  }
}
