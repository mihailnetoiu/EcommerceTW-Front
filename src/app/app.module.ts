import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './components/footer/footer.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {HomeComponent} from './components/home/home.component';
import {ProductComponent} from './components/product/product.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {LoginComponent} from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RegisterComponent} from './components/register/register.component';
import {RestService} from './services/rest.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthGuard} from './services/auth.guard';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {Store, StoreModule} from '@ngrx/store';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    WishlistComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    StoreModule.forRoot({}),
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [Store, RestService, CookieService, UserService, MatDialog, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
