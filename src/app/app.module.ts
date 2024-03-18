import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Import your components here

import { AppComponent } from './app.component';

// Define your routes here
export const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'store', component: undefined },
  { path: 'horde', component: undefined },
  // other routes...
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes), // Add this
  ],
  providers: [],
})
export class AppModule { }