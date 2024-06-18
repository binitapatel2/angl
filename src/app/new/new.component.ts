import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgFor],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  title : any = null

  applyForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  getNames = new FormGroup({
    id:new FormControl("")
  })

  httpClient = inject(HttpClient);
  public data: Array<any> = [];
  onSubmit() {
    this.httpClient.post('http://localhost:8080/api/v1/user', this.applyForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.data = data;
        }, error: (err) => console.log(err)
      });
  }
  ngOnInit() {
    this.httpClient.get('http://localhost:8080/api/v1/user')
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.data = data;
        }, error: (err) => console.log(err)
      });
  }
   onDelete(){
    this.httpClient.delete(`http://localhost:8080/api/v1/user/${this.getNames.value.id}`)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data;
        // window.location.reload()
        this.ngOnInit(); 
      }, error: (err) => console.log(err)
    });
  console.log(this.getNames.value.id)  
}  
}
