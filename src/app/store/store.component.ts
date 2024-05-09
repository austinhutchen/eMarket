import { Component, HostListener, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
interface product {
  id: number;
  name?: string;
  price?: string;
  image?: string;
  state: string;
  description: string;
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
      ]),
    ]),
    trigger('fadeImg', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translatey(20px)' }),
        animate('1s', style({ opacity: 1, transform: 'translatey(0)' })),
      ]),
    ]),

  ]
})

export class StoreComponent {

  cart: product[] = [];
  currentProduct: product;
  isMenuOpen: boolean = false;
  private overlayElement!: HTMLElement | null;
  scrollPosition: number = 0;
  private headerRef!: HTMLElement | null;
  overlayVisible: boolean = false;
  descriptions = [
    `Everyone needs a cozy go-to hoodie to curl up in, so go for one that's soft, smooth, and stylish. It's the perfect choice for cooler evenings!    • 50% pre-shrunk cotton, 50% polyester    • Fabric weight: 8.0 oz/yd² (271.25 g/m²)    • Air-jet spun yarn with a soft feel and reduced pilling    • Double-lined hood with matching drawcord    • Quarter-turned body to avoid crease down the middle    • 1 × 1 athletic rib-knit cuffs and waistband with spandex    • Front pouch pocket    • Double-needle stitched collar, shoulders, armholes, cuffs, and hem    • Blank product sourced from Bangladesh, Nicaragua, Honduras or El Salvador      This product is made especially for you as soon as you place an order, which is why it takes us a bit longer to deliver it to you. Making products on demand instead of in bulk helps reduce overproduction, so thank you for making thoughtful purchasing decisions!`,
    `Complement your everyday wardrobe with this pigment-dyed denim hat! Made out of 100% cotton, the 6-panel cap offers a light feel, while the adjustable strap ensures a solid and comfortable fit.    • 100% cotton    • 6-panel unstructured cap with a low profile    • Soft crown    • 6 sewn eyelets    • 4 rows of visible stitching on the visor    • Adjustable strap    • Head circumference: 21.65″–25.19″ (55 cm–64 cm)    • Blank product sourced from China      This product is made especially for you as soon as you place an order, which is why it takes us a bit longer to deliver it to you. Making products on demand instead of in bulk helps reduce overproduction, so thank you for making thoughtful purchasing decisions!`,
    `Everyone needs a cozy go-to hoodie to curl up in, so go for one that's soft, smooth, and stylish. It's the perfect choice for cooler evenings!    • 50% pre-shrunk cotton, 50% polyester    • Fabric weight: 8.0 oz/yd² (271.25 g/m²)    • Air-jet spun yarn with a soft feel and reduced pilling    • Double-lined hood with matching drawcord    • Quarter-turned body to avoid crease down the middle    • 1 × 1 athletic rib-knit cuffs and waistband with spandex    • Front pouch pocket    • Double-needle stitched collar, shoulders, armholes, cuffs, and hem    • Blank product sourced from Bangladesh, Nicaragua, Honduras or El Salvador      This product is made especially for you as soon as you place an order, which is why it takes us a bit longer to deliver it to you. Making products on demand instead of in bulk helps reduce overproduction, so thank you for making thoughtful purchasing decisions!`, 'The On Me Art Cover Long Sleeve. Wear your art on your sleeve, literally.',
    'The "Live ! LÓR ! Die !" Shirt. For the bold, the brave, and the fearless.',
    'The Red Rose Hat. A symbol of love, passion, and respect.',
    'The Deception Art Hoodie. Because not everything is as it seems.',
    'The "LÓR" Hoodie. Minimalist design, maximum statement.'
  ]
  products = [
    { id: 0, name: ' "OBSESSED" HOODIE ', price: (150).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/obsessed.webp', state: 'hidden', description: this.descriptions[0] },
    { id: 1, name: ' X100 CAP ', price: (50).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/x11.webp', state: 'hidden', description: this.descriptions[1] },
    { id: 2, name: ' BEAUTY + PAIN HOODIE ', price: (300).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/blckheavy.webp', state: 'hidden', description: this.descriptions[2] },
    { id: 3, name: 'ON ME ART COVER LONG SLEEVE', price: (400).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/onMe.webp', state: 'hidden', description: this.descriptions[3] },
    { id: 4, name: ' "LIVE ! LÓR ! DIE !" SHIRT', price: (500).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/livlordie.webp', state: 'hidden', description: this.descriptions[4] },
    { id: 5, name: 'RED ROSE HAT', price: (600).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/rosehat.webp', state: 'hidden', description: this.descriptions[5] },
    { id: 6, name: ' BEAUTY + PAIN HOODIE ', price: (300).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/deceptionArt.webp', state: 'hidden', description: this.descriptions[6] },
    { id: 7, name: '"LÓR" HOODIE', price: (300).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), image: 'assets/lorheavy.webp', state: 'hidden', description: this.descriptions[7] },

    // other products...
  ];
  stripe: any;
  hamburgerMenu: HTMLElement | null;

  constructor(private el: ElementRef, private http: HttpClient, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    this.initializeStripe();
    this.hamburgerMenu = null;
    this.currentProduct = this.products[0];
    this.overlayElement = this.document?.querySelector('.overlay');
  }

  ngAfterViewInit() {
    this.hamburgerMenu = this.document.querySelector('.hamburger-menu');
    this.headerRef = this.document?.querySelector('.header');

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
  @ViewChild('subItemText', { static: false }) subItemText!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: Event) {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) { // adjust this value as needed
      this.headerRef?.classList.add('header-hide');
    } else {
      this.headerRef?.classList.remove('header-hide');
    }
  }
  checkScroll() {
    const scrollPosition = window.scrollY;

    this.products.forEach((product, index) => {
      const productPosition = this.el.nativeElement.offsetTop + 200 * index;
      product.state = scrollPosition >= productPosition ? 'visible' : 'hidden';
    });
  }

}