import {Action, createReducer, on} from '@ngrx/store';
import {EcommerceActions} from './store';
import {User} from '../../models/user.interface';

export interface State {
  user: User;
  tokens: any;
}

export const initialState: State = {
  user: null,
  tokens: null
};

export const reducer = createReducer(
  initialState,

  on(EcommerceActions.getUserSuccess, ((state, {user}) => ({...state, user}))),

  on(EcommerceActions.loginSuccess, ((state, {tokens}) => ({...state, tokens}))),

  on(EcommerceActions.logout, ((state) => ({...state, user: null, tokens: null}))),
);

export function ecommerceReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
