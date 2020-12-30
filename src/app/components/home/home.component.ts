import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response: any[]) => {
        this.products = response;
        console.log(this.products);
      }
    );
  }

  selectProduct(id) {
    this.router.navigate(['/product', id]).then();
  }
}
