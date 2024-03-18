import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component'; // Import StoreComponent
import { HordeComponent } from './horde/horde.component'; // Import HordeComponent

export const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'store', component: StoreComponent }, // Use StoreComponent
  { path: 'horde', component: HordeComponent }, // Use HordeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }