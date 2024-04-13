import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app/app.module'; // Corrected path
import {AppComponent} from './app/app.component'
@NgModule({
  imports: [
   AppModule, // Add this line
    ServerModule
  ],
  bootstrap: [AppComponent], // Add this line if you have a root component
})
export default class AppServerModule { }