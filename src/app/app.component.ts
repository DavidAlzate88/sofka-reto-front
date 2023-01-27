import { Component } from '@angular/core';

export interface Section {
  name: String;
  icon: String;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reto-sofka-front';
  products: Section[] = [
    {
      name: 'List',
      icon: 'list',
    },
    {
      name: 'Create',
      icon: 'add'
    }
  ];
  buys: Section[] = [
    {
      name: 'List',
      icon: 'shopping_cart'
    }
  ];
}
