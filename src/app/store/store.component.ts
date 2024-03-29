import { Component } from '@angular/core';

@Component({
  selector: 'app-store',

  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  products = [
    { name: 'Product 1', description: 'This is product 1', price: 19.99 },
    { name: 'Product 2', description: 'This is product 2', price: 29.99 },
    // other products...
  ];
}