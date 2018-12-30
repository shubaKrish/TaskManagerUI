import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { TaskManager } from 'src/app/model/taskManager';
import { User } from 'src/app/model/user';
import { Project } from 'src/app/model/project';
import { Parent } from 'src/app/model/parent';
import { Data } from '../providers/data';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private http: HttpService, private data: Data) { }
  public addTaskForm: FormGroup;
  public task: TaskManager;
  public users: User[];
  public projects: Project[];
  public parents: Parent[];
  public parent: Parent;
  submitted = false;
  public isEdit: boolean = false;
  public isParenTaskEnabled: boolean = false;
  public message: String;
  ngOnInit() {
    this.getProjectList();
    this.getUserList();
    this.getParentList();

    if (this.data != null && this.data.storage != null) {

      let user = this.data.storage["user"];
      let userId = "";
      if (user != null && user != undefined) {
        userId = user.userId;
      }
      this.addTaskForm = new FormGroup({
        projectId: new FormControl({ value: this.data.storage["projectId"], disabled: true }, Validators.required),
        task: new FormControl(this.data.storage["task"], Validators.required),
        parentTaskCheck: new FormControl({ value: false, disabled: true }),
        priority: new FormControl(this.data.storage["priority"]),
        startDate: new FormControl(this.data.storage["startDate"], Validators.required),
        endDate: new FormControl(this.data.storage["endDate"]),
        taskId: new FormControl(this.data.storage["taskId"]),
        user: new FormControl({ value: userId, disabled: true }),
        parentId: new FormControl(this.data.storage["parentId"])
      });
      this.isEdit = true;
    } else {
      let today = new Date().toISOString().substring(0, 10);
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.addTaskForm = new FormGroup({
        projectId: new FormControl('', Validators.required),
        task: new FormControl('', Validators.required),
        parentTaskCheck: new FormControl(),
        priority: new FormControl(0),
        parentTask: new FormControl(''),
        startDate: new FormControl(today, Validators.required),
        endDate: new FormControl(tomorrow.toISOString().substring(0, 10)),
        user: new FormControl(''),
        parentId: new FormControl()
      });
      this.isEdit = false;
    }

  }

  getUserList() {
    this.http.get("v1/retrieve/users").subscribe(
      data => { this.users = data },
      err => console.error(err)
    );

  }

  getProjectList() {
    this.http.get("v1/retrieve/projects").subscribe
      (data => { this.projects = data },
      error => console.log(error));
  }

  getParentList() {
    this.http.get("v1/retrieve/parentTasks").subscribe
      (data => { this.parents = data },
      error => console.log(error));
  }

  onAdd() {

    // stop here if form is invalid
    if (this.addTaskForm.valid) {

      if (this.addTaskForm.controls["parentTaskCheck"].value == true) {
        this.parent = new Parent();
        this.parent.parentTask = this.addTaskForm.controls["parentTask"].value;
        let body = JSON.stringify(this.parent);
        this.http.post("v1/add/parentTask", body).subscribe
          (data => {this.message = "Successfully added the parent task details",
          this.getParentList()}, err => console.log(err));
      } else {
        this.task = this.addTaskForm.value;
        this.task.user = new User();
        this.task.user.userId = this.addTaskForm.controls["user"].value;
        if (this.isEdit) {
          let body = JSON.stringify(this.task);
          this.http.post("v1/update/taskmanager/" + this.data.storage["taskId"], body).subscribe
            (data => this.message = "Successfully updated the task details", 
            err => { console.log(err), this.message = "An error occurred during Update Task" });
          this.isEdit = false;
          this.onReset();
          this.data.storage = null;
          this.data = null;
        } else {
          let body = JSON.stringify(this.task);
          this.http.post("v1/add/taskmanager", body).subscribe
            (data => this.message = "Successfully added the task details", 
            err => { console.log(err), this.message = "An error occurred during Add Task" });
        }
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }
  }

  onReset() {
    let today = new Date().toISOString().substring(0, 10);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.addTaskForm.get("task").enable();
    this.addTaskForm.get("priority").enable();
    this.addTaskForm.get("startDate").enable();
    this.addTaskForm.get("endDate").enable();
    this.addTaskForm.get("user").enable();
    this.addTaskForm.get("projectId").enable();
    this.isParenTaskEnabled = false;
    this.addTaskForm.get("parentTaskCheck").enable();
    this.addTaskForm.get("parentTaskCheck").setValue(false);
    this.addTaskForm.get("task").setValue("");
    this.addTaskForm.get("priority").setValue(0);
    this.addTaskForm.get("startDate").setValue(today);
    this.addTaskForm.get("endDate").setValue(tomorrow.toISOString().substring(0, 10));
    this.addTaskForm.get("projectId").setValue("");
    if (this.addTaskForm.get("taskId") != null && this.addTaskForm.get("taskId") != undefined) {
    this.addTaskForm.get("taskId").setValue("");
    }
    if (this.addTaskForm.get("parentId") != null && this.addTaskForm.get("parentId") != undefined) {
      this.addTaskForm.get("parentId").setValue("");
    }
    if (this.addTaskForm.get("parentTask") != null && this.addTaskForm.get("parentTask") != undefined) {
      this.addTaskForm.get("parentTask").setValue("");
    }
    if (this.addTaskForm.get("user") != null) {
      this.addTaskForm.get("user").setValue("");
    }
  }

  enableParentTask() {
    if (this.addTaskForm.controls["parentTaskCheck"].value == true) {
      this.addTaskForm.get("task").disable();
      this.addTaskForm.get("priority").disable();
      this.addTaskForm.get("startDate").disable();
      this.addTaskForm.get("endDate").disable();
      this.addTaskForm.get("user").disable();
      this.addTaskForm.get("projectId").disable();
      this.isParenTaskEnabled = true;
    } else {
      this.addTaskForm.get("task").enable();
      this.addTaskForm.get("priority").enable();
      this.addTaskForm.get("startDate").enable();
      this.addTaskForm.get("endDate").enable();
      this.addTaskForm.get("user").enable();
      this.addTaskForm.get("projectId").enable();
      this.isParenTaskEnabled = false;
    }

  }

  get addFormControls() { return this.addTaskForm.controls; }

}
