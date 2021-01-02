import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EcommerceActions} from './store';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class Effects {

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EcommerceActions.getUser),
      mergeMap(() => this.userService.getUser().pipe(
        map(user => EcommerceActions.getUserSuccess ({user})),
        catchError(e => of(EcommerceActions.getUserFail({error: e})))
      )),
    ));

  getUserSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EcommerceActions.getUserSuccess),
    tap(() => this.router.navigate(['/certifications']))
  ),
    {dispatch: false});

  getUserFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EcommerceActions.getUserFail),
        tap(({error}) => console.error(error)),
        tap(() => this.notification.open('Something went wrong. Please log in again!', 'Dismiss', {duration: 3000})),
      ),
    {dispatch: false}
  );

  login$ = createEffect( () =>
  this.actions$.pipe(
    ofType(EcommerceActions.login),
    mergeMap( ({username, password}) => this.restService.login(username, password).pipe(
      map( tokens => EcommerceActions.loginSuccess({tokens})),
      catchError(error => of(EcommerceActions.loginFail({error}))),
    ))
  ));

  loginSuccess$ = createEffect( () =>
    this.actions$.pipe(
      ofType(EcommerceActions.loginSuccess),
      map(() => EcommerceActions.getUser()),
    ));

  loginFail$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EcommerceActions.loginFail),
    tap(({error}) => console.error(error)),
    tap(() => this.notification.open('Could not login. Please try again!', 'Dismiss', {duration: 3000}))
  ),
    {dispatch: false});

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EcommerceActions.logout),
    tap(() => this.restService.logout()),
    tap(() => this.router.navigate([''])),
  ),
    {dispatch: false});

  signUp$ = createEffect( () =>
  this.actions$.pipe(
    ofType(EcommerceActions.signUp),
    mergeMap( ({newUser}) => this.userService.createUser(newUser).pipe(
      map( createdUser => EcommerceActions.signUpSuccess({user: createdUser})),
      catchError( e => of(EcommerceActions.signUpFail({error: e})))
    )),
  ));

  signUpSuccess$ = createEffect( () =>
  this.actions$.pipe(
      ofType(EcommerceActions.signUpSuccess),
     tap(() => this.router.navigate([''])),
     tap(() => this.notification.open('You are now registered. Please log in to continue!', 'Dismiss', {duration: 3000})),
  ),
    {dispatch: false});

  signUpFail$ = createEffect( () =>
  this.actions$.pipe(
    ofType(EcommerceActions.signUpFail),
    tap(error => console.error(error)),
    tap(() => this.notification.open('Could not sign up. Please try again!', 'Dismiss', {duration: 3000})),
  ),
    {dispatch: false});

  constructor(private actions$: Actions,
              private userService: UserService,
              private restService: RestService,
              private router: Router,
              private notification: MatSnackBar) {
  }
}
