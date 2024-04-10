import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title: string = 'DLOR';
  overLay: boolean = false;
  private header!: HTMLElement | null;
  private hamburgerMenu!: HTMLElement | null;
  private musicIcons!: HTMLElement | null;
  private bg!: HTMLElement | null;
  private mailBox!: HTMLElement | null;
  menu: string[] = ["Home", "Shop", "Contact"];
  isOpen: boolean = false;
  isScrolled: boolean = false;
  isDesktop: boolean = false;
  inputValue: string = '';
  private observer: IntersectionObserver | null;
  ngAfterViewInit() {
    this.header = this.document.querySelector('.header');
    this.hamburgerMenu = this.document.querySelector('.hamburger-menu');
    this.musicIcons = this.document.querySelector('.music-icons');
    this.bg = this.document.querySelector('background');
    this.mailBox = this.document.querySelector('.mailBox');
    if (isPlatformBrowser(this.platformId) && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.mailBox, 'fade-in');
          } else {
            this.renderer.removeClass(this.mailBox, 'fade-in');
          }
        });
      });
      if (!this.mailBox) {
        return;
      }
      this.observer.observe(this.mailBox);
    }  else {
      // Fallback for environments that don't support IntersectionObserver
      if (this.mailBox) {
        
          this.renderer.addClass(this.mailBox, 'show');
      }
    }
  }
  constructor(private renderer: Renderer2,@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object, private el: ElementRef) {
    this.header = null;
    this.observer = null;
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
      (this.isDesktop) ? this.renderer.removeClass(this.musicIcons, 'hide-element') : this.renderer.addClass(this.musicIcons, 'hide-element');
      (this.isDesktop) ? this.renderer.addClass(this.hamburgerMenu, 'hide-element') : this.renderer.removeClass(this.hamburgerMenu, 'hide-element');

    });
  }

  toggleOverlay() {
    this.overLay = !this.overLay;
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
    this.hamburgerMenu?.classList.toggle('open');
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