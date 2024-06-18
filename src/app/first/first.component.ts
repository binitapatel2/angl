import { Component } from '@angular/core';
import { CardFancyExample } from '../card/card.component';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CardFancyExample],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {

}
