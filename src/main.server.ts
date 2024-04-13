import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import 'zone.js';
const AppServerModule = () => bootstrapApplication(AppComponent, config);

export default AppServerModule;
