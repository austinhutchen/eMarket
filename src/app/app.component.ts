import { Component } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


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
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  openMenu() {
    this.renderer?.addClass(this.document.body, 'menu-open');
  }
  
  closeMenu() {
    this.renderer?.removeClass(this.document.body, 'menu-open');
  }
  toggleMenu() {
    this.isOpen = !(this.isOpen);
  console.log(this.isOpen);
  const hamburger = document.querySelector('.hamburger-menu');
  hamburger?.classList.toggle('open');
  if (this.isOpen) {
    this.openMenu();
  } else {
    this.closeMenu();
  }
  }
}