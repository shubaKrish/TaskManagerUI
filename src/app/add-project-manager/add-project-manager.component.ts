import { Component, OnInit, ElementRef } from '@angular/core';
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
  public projects: Project[];
  public searchProject: String;
  public projectId: number;
  public isEdit: boolean=false;
  public message: String;
  constructor(private http: HttpService,private inputElement: ElementRef) { }

  ngOnInit() {  
    this.onPageLoadorReset();
  }


  onPageLoadorReset(){

    this.addProjectForm = new FormGroup({
      project: new FormControl('', Validators.required),
      dates: new FormControl('',Validators.required),
      priority: new FormControl(0,Validators.required),
      manager: new FormControl('',Validators.required),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
    this.isEdit = false;
    this.enableDisableDates();  
    this.getManagerList();
    this.getProjectList();
  }

  getManagerList() {
    console.log("calling amanger list!!");
    this.http.get("v1/retrieve/users").subscribe(
      data => { this.users = data},
      err => console.error(err)
    );

  }

  getProjectList() {
    console.log("calling project list!!");
    this.http.get("v1/retrieve/projects").subscribe(
      data => { this.projects = data, console.log("data:::"+JSON.stringify(data))},
      err => console.error(err)
    );

  }


  onAdd(){
    if(this.addProjectForm.valid){
      this.isSubmitInvalid = false;   
      this.project = this.addProjectForm.value;
      this.project.projectId = this.projectId;
      this.project.user = new User();
      this.project.user.userId = this.addProjectForm.controls["manager"].value;
      let body = JSON.stringify(this.project);
      console.log("body:::"+body);
      let url;   
      if(this.isEdit){
        url = "v1/update/projects/"+this.projectId;
        this.updateProjectDetails(url,body);
        this.onPageLoadorReset();
        this.message = "Successfully updated the project details";
      } else {
        url ="v1/add/projects";
        this.updateProjectDetails(url,body);
        this.message = "Successfully added the project details";
      }         
    } else{
       this.isSubmitInvalid = true;
    }
   }

  updateProjectDetails(url,body){
    this.http.post(url,body).subscribe(
     data => console.log(data),
     err=>this.message ="An Error occured during Add/Update!");
 }
  onReset(){
    this.onPageLoadorReset();
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

  onEdit(i){
    let projectElement = this.inputElement.nativeElement.querySelector("#project");
    projectElement.focus();
    let project = this.projects[i].project;
    let startDate = this.projects[i].startDate;
    let endDate = this.projects[i].endDate;
    let priority = this.projects[i].priority;
    this.addProjectForm.controls['project'].setValue(project);
    this.addProjectForm.controls['startDate'].setValue(startDate);
    this.addProjectForm.controls['endDate'].setValue(endDate);
    this.addProjectForm.controls['priority'].setValue(priority);
    if(startDate!=null && startDate!=undefined){
      this.addProjectForm.controls['dates'].setValue(true); 
      this.addProjectForm.controls['startDate'].enable();
      this.addProjectForm.controls['endDate'].enable();
    } else {
      this.addProjectForm.controls['dates'].setValue(false); 
      this.addProjectForm.controls['startDate'].disable();
      this.addProjectForm.controls['endDate'].disable();
    }
    this.isEdit = true;
    this.projectId = this.projects[i].projectId;
    if(this.projects[i].user!=null){
      this.addProjectForm.controls['manager'].setValue(this.projects[i].user.userId);
    } else {
      this.addProjectForm.controls['manager'].setValue('');
    }
  }

}
