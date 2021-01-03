import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {WishlistService} from '../../services/wishlist.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('category') options: ElementRef;
  @ViewChild('name') input: ElementRef;
  cartData: CartModelServer;
  cartTotal: number;
  productName: string;

  constructor(public cartService: CartService,
              public wishlistService: WishlistService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
  }

  filterCategory() {
    const category = this.options.nativeElement.value;
    this.router.navigate(['/filter'], {
      state: {
        category,
        productName: this.productName
      }
    });
  }

}
