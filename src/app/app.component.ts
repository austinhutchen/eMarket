import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  title: string = 'DLOR';
  menu: string[] = ["Home", "Shop", "Contact"];
  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !(this.isOpen);
    const hamburger = document.querySelector('.hamburger-menu');
    hamburger?.classList.toggle('open');
  }
}