import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  title = 'Store';
  product = 'Socks';
  price = 10;
  quantity = 0;
  total = 0;

  increment() {
    this.quantity++;
    this.total = this.quantity * this.price;
  }

  decrement() {
    this.quantity--;
    this.total = this.quantity * this.price;
  }
}