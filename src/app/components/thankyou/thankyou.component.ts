import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HistoryService} from '../../services/history.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  message: string;
  cartTotal: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      message: string;
      total: number;
    };
    this.message = state.message;
    this.cartTotal = state.total;
  }

  ngOnInit(): void {
  }

}
