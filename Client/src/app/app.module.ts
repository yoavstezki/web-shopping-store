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


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}


