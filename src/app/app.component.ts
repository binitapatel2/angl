import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { NewComponent } from './new/new.component';
import { HttpClientModule } from '@angular/common/http';
import { NewFormComponent } from './new-form/new-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, NewComponent, HttpClientModule, RouterLink, RouterOutlet, RouterLinkActive, NewFormComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // changed from styleUrl to styleUrls
})
export class AppComponent {
  title = 'appComponent'
}