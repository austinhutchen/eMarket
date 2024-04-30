import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
interface product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  state: string;

}
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
  cart: product[] = [];
  products = [
    { id: 1, name: ' "OBSESSED" HOODIE ', price: 150, image: 'assets/obsessed.png', description: '', state: 'hidden' },
    { id: 2, name: ' X11 CAP ', price: 50, image: 'assets/x11.jpg', description: '', state: 'hidden' },
    { id: 3, name: 'HOODIE ', price: 300, image: 'assets/blckheavy.jpg', description: 'Description 3', state: 'hidden' },
    { id: 4, name: 'Product 4', price: 400, image: 'image4.jpg', description: 'Description 4', state: 'hidden' },
    { id: 5, name: 'Product 5', price: 500, image: 'image5.jpg', description: 'Description 5', state: 'hidden' },
    { id: 6, name: 'Product 6', price: 600, image: 'image6.jpg', description: 'Description 6', state: 'hidden' }
    // other products...
  ];
  stripe: any;

  constructor(private el: ElementRef, private http: HttpClient) {
    this.initializeStripe();
  }
  addToCart(Product: product) {
    this.cart.push(Product);
  }
  async initializeStripe() {
    this.stripe = await loadStripe('your-publishable-key');
  }

  async purchaseProduct(Product: product) {
    const sessionId = await this.http.post('/create-checkout-session', { productId: Product.id })?.toPromise()
    await this.stripe.redirectToCheckout({ sessionId });
  }


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;

    this.products.forEach((product, index) => {
      const productElement = this.el.nativeElement.querySelector(`#product${index}`);
      const productPosition = productElement.offsetTop;

      product.state = scrollPosition > productPosition ? 'visible' : 'hidden';
    });
  }

}