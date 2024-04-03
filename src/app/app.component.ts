import { Component, AfterViewInit, ViewChild,ElementRef} from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit{
  title: string = 'DLOR';
  menu: string[] = ["Home", "Shop", "Contact"];
  isOpen: boolean = false;
  isScrolled: boolean = false;
  inputValue: string = '';

  submitForm() {
    console.log(this.inputValue);
  }
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    this.document.addEventListener('scroll', () => {
      const header = this.document.querySelector('header');
      if (this.document.documentElement.scrollTop === 0) {
        this.renderer.addClass(header, 'black-background');
      } else {
        this.renderer.removeClass(header, 'black-background');

      }
    });
  }
  
  @ViewChild('background') backgroundImage!: ElementRef;


  ngAfterViewInit() {
    this.renderer.listen('window', 'load', () => {
      console.log("loaded");

    });

  }
  openMenu():void {
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