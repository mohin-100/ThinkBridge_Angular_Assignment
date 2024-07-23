import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { AuthGuard } from './auth.guard';
import { RestaurantListingComponent } from './components/restaurant-listing/restaurant-listing.component';

const routes: Routes = [
  //added the gaurds to make the routes protected
  { path: 'login', component: LoginComponent },
  { path: 'home', component: RestaurantListingComponent, canActivate: [AuthGuard] },
  {
    path: 'add-restaurant',
    component: RestaurantFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-restaurant/:id',
    component: RestaurantFormComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },

  //in case of components in different modules below can be done
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./login/login.module').then((m) => m.LoginModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
