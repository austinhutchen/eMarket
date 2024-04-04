import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title: string = 'DLOR';
  overLay: boolean = false;
  menu: string[] = ["Home", "Shop", "Contact"];
  isOpen: boolean = false;
  isScrolled: boolean = false;
  inputValue: string = '';

  submitForm() {
    console.log(this.inputValue);
  }
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    this.renderer.listen('window', 'scroll', (e: Event) => {
      if (window.scrollY > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
  }
  toggleOverlay() {
    this.overLay = !this.overLay;
  }
  @ViewChild('background') backgroundImage!: ElementRef;


  ngAfterViewInit() {
    this.renderer.listen('window', 'load', () => {
      console.log("loaded");

    });

  }
  openMenu(): void {
    this.renderer?.addClass(this.document.body, 'menu-open');
    this.toggleOverlay();

  }

  closeMenu() {
    this.renderer?.removeClass(this.document.body, 'menu-open');
    this.toggleOverlay();

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