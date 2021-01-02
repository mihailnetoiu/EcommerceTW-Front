import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.interface';

@Injectable()
export class UserService {
  public constructor(private restService: RestService) {
  }

  getUser(): Observable<User> {
    return this.restService.read<User>('/user');
  }

  createUser(newUser: User): Observable<User> {
    return this.restService.register('/register', newUser);
  }
}
