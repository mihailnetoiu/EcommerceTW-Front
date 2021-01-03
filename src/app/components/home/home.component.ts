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
    public homeService: HomeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response: ProductModelServer[]) => {
        this.products = response;
      }
    );
  }

  getTopSales(id: number) {
    if (id === 0) {
      return this.products.slice(0, 4);
    } else if (id === 1) {
      return this.products.slice(4, 8);
    } else {
      return this.products.slice(8, 12);
    }
  }

  filterCategory(categ: string) {
    const category = categ;
    this.router.navigate(['/filter'], {
      state: {
        category,
        productName: undefined
      }
    });
  }

}
