import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit {
  public title: string = 'DLOR';
  private overLay: boolean = false;
  private header!: HTMLElement | null | undefined;
  private hamburgerMenu!: HTMLElement | null | undefined;
  private mailBox!: HTMLElement | null | undefined;
  private menu: string[] = ["Home", "Shop", "Contact"];
  private isOpen: boolean = false;
  public isScrolled: boolean = false;
  private isDesktop: boolean = false;
  private inputValue: string = '';
  private observer: IntersectionObserver | null;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document | null,
    @Inject(PLATFORM_ID) private platformId: Object | null
  ) {

    this.header = null;
    this.observer = null;
    this.renderer.listen('window', 'scroll', (e: Event) => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        this.renderer.addClass(this.header, 'scrolled');
      } else {
        this.renderer.removeClass(this.header, 'scrolled');
      }
    });

  }


  ngAfterViewInit() {
    this.header = this.document?.querySelector('.header');
    this.hamburgerMenu = this.document?.querySelector('.hamburger-menu');
    this.mailBox = this.document?.querySelector('.mailBox');
    if (!this.header || !this.hamburgerMenu || !this.mailBox || !this.platformId) {
      return;
    }
    if (isPlatformBrowser(this.platformId) && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (this.mailBox && entry.isIntersecting) {
            this.renderer.addClass(this.mailBox, 'fade-in');
          } else if (this.mailBox) {
            this.renderer.removeClass(this.mailBox, 'fade-in');
          }
        });
      }, {
        threshold: 1.0 // Adjust this value
      });
    }
  }


  toggleOverlay() {
    this.overLay = !this.overLay;
  }


  openMenu(): void {
    if (!this.document) {
      return;
    }
    this.renderer?.addClass(this.document.body, 'menu-open');
    this.toggleOverlay();

  }

  closeMenu() {
    if (!this.document) {
      return;
    }
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

