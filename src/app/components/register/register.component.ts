import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.interface';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Store} from '@ngrx/store';
import {EcommerceActions} from '../store/store';
import {State} from '../store/reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  name: string;
  password: string;
  retypedPassword: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<State>) { }

  ngOnInit() {

  }

  register() {
    const newUser: User = {
      id: undefined,
      name: this.name,
      username: this.username,
      password: this.password,
      role: 'DEFAULT',
    };
    this.store.dispatch(EcommerceActions.signUp({newUser}));
  }

  validRegistration() {
    return this.username && this.name && this.password && (this.password === this.retypedPassword);
  }

  cancel() {
    this.name = null;
    this.username = null;
    this.password = null;
  }
}
