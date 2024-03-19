import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { HordeComponent } from './horde/horde.component';

// Define your routes
const routes: Routes = [
  { path: 'home', component: AppComponent },
{ path: '', component: AppComponent },
{ path: 'horde', component: HordeComponent },
{ path: 'store', component: StoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
