import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup,Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-project-manager',
  templateUrl: './add-project-manager.component.html',
  styleUrls: ['./add-project-manager.component.css']
})
export class AddProjectManagerComponent implements OnInit {
  public isSubmitInvalid: boolean = false;
  public addProjectForm: FormGroup;
  public error:any = {isDateError:false, errorMessage:''};
  public managers: any = [];
  public project: Project;
  public users: User[];
  constructor(private http: HttpService) { }

  ngOnInit() {
  

    this.addProjectForm = new FormGroup({
      project: new FormControl('', Validators.required),
      dates: new FormControl('',Validators.required),
      priority: new FormControl(0,Validators.required),
      manager: new FormControl('',Validators.required),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
   this.enableDisableDates();  
   this.getManagerList();

  }

  getManagerList() {
    console.log("calling amanger list!!");
    this.http.get("v1/retrieve/users").subscribe(
      data => { this.users = data, console.log("data:::"+data)},
      err => console.error(err)
    );

  }


  onAdd(){
    if(this.addProjectForm.valid){
      this.isSubmitInvalid = false;   
      this.project = this.addProjectForm.value;
      this.project.user = new User();
      this.project.user.userId = this.addProjectForm.controls["manager"].value;
      let body = JSON.stringify(this.project);
      console.log("body:::"+body);
      let url  ="v1/add/projects";      
      this.updateProjectDetails(url,body);
    } else{
       this.isSubmitInvalid = true;
    }
   }

  updateProjectDetails(url,body){
    this.http.post(url,body).subscribe(
     data => console.log(data),
     err=> console.log(err));
 }
  onReset(){

  }

  enableDisableDates(){
    if(this.addProjectForm.controls["dates"].value==true){
      let today = new Date().toISOString().substring(0,10);
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate()+1);
      
      this.addProjectForm.controls["startDate"].enable();
      this.addProjectForm.controls["endDate"].enable();   
      this.addProjectForm.controls["startDate"].setValue(today);
      this.addProjectForm.controls["endDate"].setValue(tomorrow.toISOString().substring(0,10));
     } else {
     this.addProjectForm.controls["startDate"].disable();
     this.addProjectForm.controls["endDate"].disable();
    }
  }


  get addProjectFormControls(){
    return this.addProjectForm.controls;
  }

  compareDates(){
    let startDate = this.addProjectForm.controls["startDate"].value;
    let endDate = this.addProjectForm.controls["endDate"].value;
    if(endDate<startDate){
      console.log("end date is lesser than start date");
      this.error = {isDateError:true, errorMessage: "End Date cannot before start date!"};
    } else {
      this.error = {isDateError:false, errorMessage: ""}; 
    }
  }

}
