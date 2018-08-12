import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {FooterComponent} from './component/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './component/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './component/register/register.component';
import {UserService} from './service/user.service';
import {LoginComponent} from './component/login/login.component';
import {AuthService} from './service/auth.service';
import {ProfileComponent} from './component/profile/profile.component';
import {ProductItemComponent} from './component/product/product-item/product-item.component';
import {ProductComponent} from './component/product/product.component';
import {AboutComponent} from './component/about/about.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ShopsMapComponent} from './component/shops-map/shops-map.component';
import {GooglMapService} from './service/google-maps/google-map.service';
import {ShopService} from './service/shop.service';
import {ProductService} from './service/product.service';
import {CreateProductComponent} from './component/product/CRUD/create/create-product.component';
import {StatsComponent} from './component/stats/stats.component';
import {StatsCountComponent} from './component/stats/stats-count.component';
import {UpdateProductComponent} from './component/product/CRUD/update/update-product.component';
import {SearchComponent} from './component/product/CRUD/search/search.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'product', component: ProductComponent},
  {path: 'about', component: AboutComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'shops-map', component: ShopsMapComponent},
  {path: 'products/create', component: CreateProductComponent},
  {path: 'products/search', component: SearchComponent},
  {path: 'products/update/:serial', component: UpdateProductComponent},
  {path: 'products/stats', component: StatsComponent},
  {path: 'products/stats2', component: StatsCountComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ProductItemComponent,
    ProductComponent,
    AboutComponent,
    DashboardComponent,
    ShopsMapComponent,
    CreateProductComponent,
    UpdateProductComponent,
    SearchComponent,
    StatsComponent,
    StatsCountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule

  ],
  providers: [UserService, AuthService, GooglMapService, ShopService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}


