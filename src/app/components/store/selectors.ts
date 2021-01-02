import {State} from './reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const ecommerceReducer = createFeatureSelector<State>('ecommerce');

export const user = createSelector(
  ecommerceReducer,
  state => state.user,
);

export const tokens = createSelector(
  ecommerceReducer,
  state => state.tokens
);
