import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {EcommerceActions} from '../store/store';
import {State} from '../store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private restService: RestService,
    private router: Router,
    private store: Store<State>) { }

  password: string;
  username: string;

  ngOnInit() {

  }

  login(): void {
    this.store.dispatch(EcommerceActions.login({username: this.username, password: this.password}));
    this.password = '';
  }

  register() {
    this.router.navigate(['/register']);
  }
}
