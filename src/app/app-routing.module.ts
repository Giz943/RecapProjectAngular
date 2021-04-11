import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarsComponent } from './components/cars/cars.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalControlComponent } from './components/rental-control/rental-control.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarsComponent},
  {path:"cars", component:CarsComponent},
  {path:"cars/:colorId&brandId", component:CarsComponent},
  {path:"carDetail/:carId", component:CarDetailComponent},
  {path:"rentalControl/:carId", component:RentalControlComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"carAdd",component:CarAddComponent,canActivate:[AdminGuardGuard]},
  {path:"carUpdate/:carId",component:CarUpdateComponent,canActivate:[AdminGuardGuard]},
  {path:"brandUpdate/:brandId",component:BrandUpdateComponent,canActivate:[AdminGuardGuard]},
  {path:"colorUpdate/:colorId",component:ColorUpdateComponent,canActivate:[AdminGuardGuard]}, 
  {path:"brandAdd",component:BrandAddComponent,canActivate:[AdminGuardGuard]},
   {path:"colorAdd",component:ColorAddComponent,canActivate:[AdminGuardGuard]},
   { path: 'carRental/:carId', component: CarRentalComponent,canActivate: [LoginGuard], },
   { path: 'payment', component: PaymentComponent  ,canActivate: [LoginGuard],},
    { path: 'editProfile', component: EditProfileComponent,canActivate: [LoginGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
