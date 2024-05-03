import { Component, HostListener, ElementRef, Renderer2, Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

interface product {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  state?: string;
  description?: string;
}
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translatex(-100px)' })),
      state('*', style({ opacity: 1, transform: 'translatex(0)' })),  // Add this line
      transition(':enter', [
        animate('1.5s 0s cubic-bezier(0.68, -0.55, 0.27, 1.55)')
      ])
    ])
  ]
})

export class StoreComponent {
  cart: product[] = [];
  currentProduct: product;
  isMenuOpen: boolean = false;
  private overlayElement!: HTMLElement | null;

  overlayVisible: boolean = false;
  descriptions = [
    'Embrace your obsession. This hoodie is for those who are unapologetically passionate.',
    'The X100 Cap. A statement piece that speaks volumes about your style.',
    'The Beauty + Pain Hoodie. For those who understand that true beauty often comes with a price.',
    'The On Me Art Cover Long Sleeve. Wear your art on your sleeve, literally.',
    'The "Live ! LÓR ! Die !" Shirt. For the bold, the brave, and the fearless.',
    'The Red Rose Hat. A symbol of love, passion, and respect.',
    'The Deception Art Hoodie. Because not everything is as it seems.',
    'The "LÓR" Hoodie. Minimalist design, maximum statement.'
  ]
  products = [
    { id: 0, name: ' "OBSESSED" HOODIE ', price: 150, image: 'assets/obsessed.webp', state: 'hidden', description: this.descriptions[0] },
    { id: 1, name: ' X100 CAP ', price: 50, image: 'assets/x11.webp', state: 'hidden', description: this.descriptions[1] },
    { id: 2, name: ' BEAUTY + PAIN HOODIE ', price: 300, image: 'assets/blckheavy.webp', state: 'hidden', description: this.descriptions[2] },
    { id: 3, name: 'ON ME ART COVER LONG SLEEVE', price: 400, image: 'assets/onMe.webp', state: 'hidden', description: this.descriptions[3] },
    { id: 4, name: ' "LIVE ! LÓR ! DIE !" SHIRT', price: 500, image: 'assets/livlordie.webp', state: 'hidden', description: this.descriptions[4]},
    { id: 5, name: 'RED ROSE HAT', price: 600, image: 'assets/rosehat.webp', state: 'hidden', description: this.descriptions[5] },
    { id: 6, name: ' BEAUTY + PAIN HOODIE ', price: 300, image: 'assets/deceptionArt.webp', state: 'hidden', description: this.descriptions[6] },
    { id: 7, name: '"LÓR" HOODIE', price: 300, image: 'assets/lorheavy.webp', state: 'hidden', description: this.descriptions[7] },

    // other products...
  ];
  stripe: any;

  hamburgerMenu: Element | null;

  constructor(private el: ElementRef, private http: HttpClient, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    this.initializeStripe();
    this.hamburgerMenu = null;
    this.currentProduct = this.products[0];
    this.overlayElement = this.document?.querySelector('.overlay');
  }

  ngAfterViewInit() {
    this.hamburgerMenu = this.document.querySelector('.hamburger-menu');
  }
  openMenu(): void {
    if (!this.document) {
      return;
    }
    this.isMenuOpen = true;
    this.renderer?.addClass(this.document.body, 'menu-open');
    this.hamburgerMenu?.classList.add('open');
    this.overlayElement?.classList.remove('exit');
  }

  closeMenu() {
    if (!this.document) {
      return;
    }
    this.isMenuOpen = false;
    this.renderer?.removeClass(this.document.body, 'menu-open');
    this.hamburgerMenu?.classList.remove('open');
    this.overlayElement?.classList.add('exit');
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  addToCart(Product: product) {
    this.cart.push(Product);
    console.log('product pushed into cart');
  }
  async initializeStripe() {
    this.stripe = await loadStripe('your-publishable-key');
  }

  async purchaseProduct(Product: product) {
    const sessionId = await this.http.post('/create-checkout-session', { productId: Product.id })?.toPromise()
    await this.stripe.redirectToCheckout({ sessionId });
  }
  navProduct(link: number) {
    this.overlayVisible = true;
    this.currentProduct = this.products[link];
    console.log(this.currentProduct);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY;

    this.products.forEach((product, index) => {
      const productPosition = this.el.nativeElement.offsetTop + 200 * index;
      product.state = scrollPosition >= productPosition ? 'visible' : 'hidden';
    });
  }

}