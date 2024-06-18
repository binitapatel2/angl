import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, HttpClientModule],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.css'
})
export class NewFormComponent {
  title : any = {name:"", email:"", age:""}

  formGroup = new FormGroup({
    name : new FormControl(""),
    email : new FormControl(""),
    age : new FormControl("")
  })

  httpClient = inject(HttpClient);
  public data: Array<any> = [];
  onSubmit(){
    console.log("form group", this.formGroup.value)
    this.title = this.formGroup.value

    this.httpClient.post('http://localhost:8080/api/v1/user', this.formGroup.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.data = data;
        }, error: (err) => console.log(err)
      });
  }
}
