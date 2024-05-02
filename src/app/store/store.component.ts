import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
interface product {
  id: number;
  name: string;
  price: number;
  image: string;
  state: string;
  link: string;  // Add this line

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
    { id: 1, name: ' "OBSESSED" HOODIE ', price: 150, image: 'assets/obsessed.webp', state: 'hidden', link: '' },
    { id: 2, name: ' X100 CAP ', price: 50, image: 'assets/x11.webp', state: 'hidden', link: '' },
    { id: 3, name: ' BEAUTY + PAIN HOODIE ', price: 300, image: 'assets/blckheavy.webp', state: 'hidden', link: '' },
    { id: 4, name: 'ON ME ART COVER LONG SLEEVE', price: 400, image: 'assets/onMe.webp', state: 'hidden', link: '' },
    { id: 5, name: ' "LIVE ! LÓR ! DIE !" SHIRT', price: 500, image: 'assets/livlordie.webp', state: 'hidden', link: '' },
    { id: 6, name: 'RED ROSE HAT', price: 600, image: 'assets/rosehat.webp', state: 'hidden', link: '' }
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