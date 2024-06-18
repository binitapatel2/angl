import { Component, Inject, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgFor, MatButtonModule, MatDialogModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  title : any = {name:"", email:"", age:""}
  constructor(public dialog: MatDialog) {}

  applyForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    age: new FormControl("")
  });

  getNames = new FormGroup({
    name:new FormControl(""),
    _id: new FormControl("")
  })

  httpClient = inject(HttpClient);
  public data: Array<any> = [];
  submitApp() {
    console.log(this.applyForm.value);
    this.title = this.applyForm.value

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

  edit(email: any){
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {data : {email : email}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    console.log(email)
    console.log(this.getNames.value.name)
    console.log("edit button")
  }
  delete(_id: String){
    this.httpClient.delete(`http://localhost:8080/api/v1/user/${_id}`)
    .subscribe({
      next:(data:any)=>{
        console.log(data)
        this.data = data
        this.ngOnInit()
      }, error: (err) =>console.log(err)
    }
    )
    console.log(_id)
    console.log("delete button")
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'popupFile.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, HttpClientModule, NgFor],
})

export class DialogContentExampleDialog {
  title : any = {name:"", email:"", age:""}
  id : String = ""

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    if (dialogData && dialogData.email) {
      console.log(dialogData)
      this.applyForm.controls['email'].setValue(dialogData.email.email);
      this.applyForm.controls['name'].setValue(dialogData.email.name);
      this.applyForm.controls['age'].setValue(dialogData.email.age);
      this.id = dialogData.email._id
    }
  }

  applyForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    age: new FormControl("")
  });

  httpClient = inject(HttpClient);
  public data: Array<any> = [];
  
  submitApp() {
    console.log(this.applyForm.value, "form submitted");
    this.title = this.applyForm.value
    console.log(this.id)
    this.httpClient.put(`http://localhost:8080/api/v1/user/${this.id}`, this.applyForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.data = data;
          window.location.reload()
        }, error: (err) => console.log(err)
      });
  }
}