import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {FilterComponent} from './components/filter/filter.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {ContactComponent} from './components/contact/contact.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
