import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductModelServer} from '../../models/product.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response: ProductModelServer[]) => {
        console.log(response);
        this.products = response;
      }
    );
  }

  selectProduct(id) {
    this.router.navigate(['/product', id]).then();
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id);
  }
}
