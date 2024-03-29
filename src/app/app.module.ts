import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HordeComponent } from './horde/horde.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: 'store', component: StoreComponent },
  { path: 'horde', component: HordeComponent },
  // more routes...
];

@NgModule({
  declarations: [
    AppComponent,
    HordeComponent,
    StoreComponent,
    // Other declarations...
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
    // Other imports...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }