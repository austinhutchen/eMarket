import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
  private header: HTMLElement | null;

  menu: string[] = ["Home", "Shop", "Contact"];
  isOpen: boolean = false;
  @ViewChild('musicIcons') musicIcons!: ElementRef;
  isScrolled: boolean = false;
  isDesktop: boolean = false;
  inputValue: string = '';
  @ViewChild('hamburger-menu') hamburgerMenu!: ElementRef;
  ngAfterViewInit() {
    this.header = this.document.querySelector('.header');
  }
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private el: ElementRef) {
this.header = null;
    this.renderer.listen('window', 'resize', (e: Event) => {
      if (this.isDesktop) {
        this.renderer.addClass(this.hamburgerMenu, 'hide-element');
      } else {
        this.renderer.removeClass(this.hamburgerMenu, 'hide-element');
      }
    });
    this.renderer.listen('window', 'scroll', (e: Event) => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 100) {
        this.renderer.addClass(this.header, 'scrolled');
      } else {
        this.renderer.removeClass(this.header, 'scrolled');
      }
    });
    this.renderer.listen('window', 'load', (e: Event) => {
      this.isDesktop = window.innerWidth > 768;
      (this.isDesktop) ? this.renderer.removeClass(this.musicIcons.nativeElement, 'hide-element') : this.renderer.addClass(this.musicIcons.nativeElement, 'hide-element');
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

  submitForm() {
    console.log(this.inputValue);
  }
}