import {ChangeDetectionStrategy, Component, inject, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'card-fancy-example',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, HttpClientModule, NgFor, MatTooltipModule, MatTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFancyExample {
  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  httpClient = inject(HttpClient);
  public data: Array<any> = [];

  ngOnInit(){
    this.httpClient.get('http://localhost:8080/api/v1/user')
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data;
      }, error: (err) => console.log(err)
    });
  }
}