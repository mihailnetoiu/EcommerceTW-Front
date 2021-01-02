import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user.interface';

export const getUser = createAction(
  '[Home Page] Get User'
);

export const getUserSuccess = createAction(
  '[Home API] Get User Success',
  props<{ user: User }>(),
);

export const getUserFail = createAction(
  '[Home API] Get User Fail',
  props<{ error: any }>(),
);

export const login = createAction(
  '[Home page] Login',
  props <{username: string, password: string}>(),
);

export const loginSuccess = createAction(
  '[Home API] Login Success',
  props<{tokens: any}>(),
);

export const loginFail = createAction(
  '[Home API] Login Fail',
  props<{ error: any}>(),
);

export const logout = createAction(
  '[Home Page] Logout',
);

export const signUp = createAction(
  '[Home Page] Sign Up',
  props<{newUser: User}>(),
);

export const signUpSuccess = createAction(
  '[Home API] Sign Up Success',
  props<{user: User}>(),
);

export const signUpFail = createAction(
  '[Home API] Sign Up Fail',
  props<{error: any}>(),
);
