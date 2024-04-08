import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HordeComponent } from './horde/horde.component'; // Import HordeComponent
import { StoreComponent } from './store/store.component'; // Import StoreComponent

export const routes: Routes = [
  { path: 'horde', component: HordeComponent },
  { path: 'store', component: StoreComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }