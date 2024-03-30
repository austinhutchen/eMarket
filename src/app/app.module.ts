import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HordeComponent } from './horde/horde.component';
import { StoreComponent } from './store/store.component';

@NgModule({
  declarations: [
    AppComponent,
    HordeComponent,
    StoreComponent,
    // Other declarations...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Other imports...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }