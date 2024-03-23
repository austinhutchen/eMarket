import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule

import { HordeComponent } from './horde/horde.component';
import { StoreComponent } from './store/store.component';

@NgModule({
  declarations: [


    // other declarations...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Add this
    AppComponent
    // other imports...
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }