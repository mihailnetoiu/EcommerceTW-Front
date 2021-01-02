import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../components/store/reducers';
import {EcommerceSelectors} from '../components/store/store';
import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
          select(EcommerceSelectors.tokens),
          map (tokens => tokens !== null),
          tap (bool =>  {
            if (bool === false) {
              this.router.navigate(['']);
      }}),
        );
    }
}
