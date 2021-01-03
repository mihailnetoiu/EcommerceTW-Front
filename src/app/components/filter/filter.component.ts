import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ProductModelServer} from '../../models/product.model';
import {CategoryModel} from '../../models/category.model';
import {HomeService} from '../../services/home.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  category: string;
  name: string;
  filteredProducts: ProductModelServer[];
  products: ProductModelServer[];

  constructor(private router: Router,
              private productService: ProductService,
              public  homeService: HomeService) {
    router.events.subscribe(value => {
      if (router.url === '/filter') {
        this.filterProducts();
        this.getAllProducts();
      }
    });
  }

  ngOnInit(): void {
  }

  initRouter(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      category: string;
      productName: string;
    };
    this.category = state.category;
    this.name = state.productName;
  }

  getTopSales(id: number): ProductModelServer[] {
    if (id === 0) {
      return this.products.slice(0, 4);
    } else if (id === 1) {
      return  this.products.slice(4, 8);
    } else {
      return this.products.slice(8, 12);
    }
  }

  filterProducts(): void {
    this.initRouter();
    if (this.category === 'All' && !this.name) {
      this.productService.getAllProducts().toPromise().then((data: ProductModelServer[]) => this.filteredProducts = data);
      return;
    }
    if (this.category !== 'All' && !this.name) {
      const cat: CategoryModel = {
        id: 0,
        name: this.category
      };
      this.productService.getProductsFromCategory(cat).toPromise().then((data: ProductModelServer[]) => this.filteredProducts = data);
      return;
    }
    if (this.category === 'All' && this.name) {
      this.productService.getProductsByName(this.name).toPromise().then((data: ProductModelServer[]) => this.filteredProducts = data);
      return;
    }

    this.productService.getProductsByName(this.name).toPromise().then((data: ProductModelServer[]) => {
      this.filteredProducts = data;
      this.filteredProducts = this.filteredProducts.filter((product: ProductModelServer) => product.category.name === this.category);
    });
  }

  private getAllProducts() {
    this.productService.getAllProducts().toPromise().then((data: ProductModelServer[]) => this.products = data);
  }
}
