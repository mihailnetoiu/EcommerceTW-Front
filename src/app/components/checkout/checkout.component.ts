import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {HistoryService} from '../../services/history.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from '../../models/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartTotal: number;
  cartData: CartModelServer;

  constructor(
    public cartService: CartService,
    private historyService: HistoryService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  private timeoutPromise(seconds: number) {
    return new Promise<any>( resolve => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  onCheckout() {
    this.spinner.show();
    this.timeoutPromise(5).then(() => this.spinner.hide());
    this.cartService.checkoutFromCart(1);
  }
}
