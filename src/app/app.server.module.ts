import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],

})
export class AppServerModule { }
bootstrapApplication(AppComponent);