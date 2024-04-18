import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  animations: [
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('1s'))
    ])
  ]
})
export class StoreComponent {
  products = [
    { id: 1, name: 'Product 1', price: 100, image: 'image1.jpg', description: 'Description 1', state: 'hidden' },
    { id: 2, name: 'Product 2', price: 200, image: 'image2.jpg', description: 'Description 2', state: 'hidden' },
    { id: 3, name: 'Product 3', price: 100, image: 'image3.jpg', description: 'Description 1', state: 'hidden' },
    { id: 4, name: 'Product 4', price: 100, image: 'image4.jpg', description: 'Description 1', state: 'hidden' },
    { id: 5, name: 'Product 5', price: 100, image: 'image5.jpg', description: 'Description 1', state: 'hidden' },
    { id: 6, name: 'Product 6', price: 100, image: 'image6.jpg', description: 'Description 1', state: 'hidden' }
    // other products...
  ];

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;

    this.products.forEach((product, index) => {
      const productElement = this.el.nativeElement.querySelector(`#product${index}`);
      const productPosition = productElement.offsetTop;

      product.state = scrollPosition > productPosition ? 'visible' : 'hidden';
    });
  }

  constructor(private el: ElementRef) { }
}