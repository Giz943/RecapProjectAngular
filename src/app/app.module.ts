import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ToastrModule} from "ngx-toastr";
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { NaviComponent } from './components/navi/navi.component';
import { MarkaAreaComponent } from './components/marka-area/marka-area.component';
import { CarsComponent } from './components/cars/cars.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ColorsComponent } from './components/colors/colors.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterNavbarComponent } from './components/car-filter-navbar/car-filter-navbar.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalControlComponent } from './components/rental-control/rental-control.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginNavbarComponent } from './components/login-navbar/login-navbar.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PaymentComponent } from './components/payment/payment.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    MarkaAreaComponent,
    CarsComponent,
    BrandsComponent,
    ColorsComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterNavbarComponent,
    CarDetailComponent,
    RentalControlComponent,
    LoginComponent,
    RegisterComponent,
    LoginNavbarComponent,
    BrandAddComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    CarUpdateComponent,
    CarAddComponent,
    PaymentComponent,
    CarRentalComponent,
    EditProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })

  ],
  
  //provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  providers: [ {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
