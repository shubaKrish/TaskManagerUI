import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, FormControl, FormArray,Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public user: User;
  public userlist: User[];
  public addUserForm: FormGroup;
  public submitted: boolean = false;
  public isEdit: boolean = false;
  public searchUser: string;
  public userId: number;
  public index: number;
  constructor(private http:HttpService, private inputElement: ElementRef) { }
  
  ngOnInit() {
      this.addUserForm = new FormGroup({
           firstName: new FormControl('',Validators.required),
           lastName: new FormControl('',Validators.required),
           employeeId: new FormControl('',Validators.required)
      });
      this.getUserList();
  }

  getUserList(){
    this.http.get("v1/retrieve/users").subscribe
    (data=> {this.userlist = data, console.log(data)},
      error=> console.log(error));  
  }

  

  onAddorUpdateUser(){
   if(this.addUserForm.valid){
     this.submitted = false;   
     this.user = this.addUserForm.value;
     this.user.userId = this.userId;
     let body = JSON.stringify(this.user);
     console.log("body:::"+body);
     let url;
     if(this.isEdit){
       url = "v1/update/user/"+this.user.userId;
     } else {
       url ="v1/add/users";
     }
     this.updateUserDetails(url,body);
     this.updateViewUserDetails();
   } else{
      this.submitted = true;
   }
  }

  updateUserDetails(url,body){
     this.http.post(url,body).subscribe(
      err=> console.log(err));
  }

  updateViewUserDetails(){
    this.userlist[this.index] = this.addUserForm.value;
 }

  onReset(){
    this.addUserForm.controls['firstName'].setValue('');
    this.addUserForm.controls['lastName'].setValue('');
    this.addUserForm.controls['employeeId'].setValue('');
  }

  get addUserFormControls(){
    return this.addUserForm.controls;
  }

  
  onEdit(i){
    let firstNameElement = this.inputElement.nativeElement.querySelector("#firstName");
    firstNameElement.focus();
    let lastNameElement = this.inputElement.nativeElement.querySelectorAll("#lastName");
    let employeeIdElement = this.inputElement.nativeElement.querySelectorAll("#employeeId");
    let firstName = this.userlist[i].firstName;
    let lastName = this.userlist[i].lastName;
    let employeeId = this.userlist[i].employeeId;
    this.addUserForm.controls['firstName'].setValue(firstName);
    this.addUserForm.controls['lastName'].setValue(lastName);
    this.addUserForm.controls['employeeId'].setValue(employeeId);    
    this.isEdit = true;
    this.userId = this.userlist[i].userId;
    this.index = i;
  }


callPOSTRestWebService(url,body){
  this.http.post(url,body).subscribe
  (data=>console.log(data), err=> console.log(err));
}

onDelete(i){
  let userId = this.userlist[i].userId;
  let body = JSON.stringify(this.userlist);
  this.http.delete("v1/delete/user/"+userId,body).subscribe
  (data=>console.log(data), err=> console.log(err));
  this.userlist.splice(i,1);
}

}
