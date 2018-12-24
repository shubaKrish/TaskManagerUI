import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup,Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { TaskManager } from 'src/app/model/taskManager';
import { User } from 'src/app/model/user';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private http: HttpService) { }
  public addTaskForm: FormGroup;
  public task:TaskManager;
  public users:User[];
  public projects:Project[];
  submitted = false;
  ngOnInit() {
    this.addTaskForm = new FormGroup({
      projectId: new FormControl('',Validators.required),
      task: new FormControl('',Validators.required),
      priority: new FormControl('',Validators.required),
      parentTask: new FormControl(''),
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl(),
      user: new FormControl('', Validators.required)
    });
    this.getUserList();
    this.getProjectList();
    }

    getUserList() {
      console.log("calling amanger list!!");
      this.http.get("v1/retrieve/users").subscribe(
        data => { this.users = data, console.log("data:::"+data)},
        err => console.error(err)
      );
  
    }

    getProjectList(){
      this.http.get("v1/retrieve/projects").subscribe
      (data=> {this.projects = data, console.log(data)},
        error=> console.log(error));  
    }

    onAdd(){
      this.submitted=true;
       // stop here if form is invalid
       if (this.addTaskForm.invalid) {
        return;
       } else {
       this.task = this.addTaskForm.value;
       this.task.user = new User();
       this.task.user.userId = this.addTaskForm.controls["user"].value;       
       let body = JSON.stringify(this.task);
       console.log("body::"+body);
       this.http.post("v1/add/taskmanager",body).subscribe
       (data=>console.log(data), err=> console.log(err));
      }
    }

    onReset(){
      this.addTaskForm.get("task").setValue("");
      this.addTaskForm.get("priority").setValue("");
      this.addTaskForm.get("parentTask").setValue("");
      this.addTaskForm.get("startDate").setValue("");
      this.addTaskForm.get("endDate").setValue("");
    }

    get addFormControls() { return this.addTaskForm.controls; }

}
