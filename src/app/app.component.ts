import { Component, ViewChild, ElementRef } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title: string = 'DLOR';
  overLay: boolean = false;
  menu: string[] = ["Home", "Shop", "Contact"];
  isOpen: boolean = false;
  @ViewChild('musicIcons') musicIcons!: ElementRef;
  isScrolled: boolean = false;
  isDesktop: boolean = false;
  inputValue: string = '';

  submitForm() {
    console.log(this.inputValue);
  }
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    this.renderer.listen('window', 'resize', (e: Event) => {
      this.isDesktop = window.innerWidth > 768;
    });
    this.renderer.listen('window', 'scroll', (e: Event) => {
      if (window.scrollY > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
    this.renderer.listen('window', 'load', (e: Event) => {
      this.isDesktop = window.innerWidth > 768;
    (this.isDesktop)? this.renderer.removeClass(this.musicIcons.nativeElement, 'd-none'): this.renderer.addClass(this.musicIcons.nativeElement, 'd-none');
    });
  }
  toggleOverlay() {
    this.overLay = !this.overLay;
  }
  @ViewChild('background') backgroundImage!: ElementRef;


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