import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup,Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { TaskManager } from 'src/app/model/taskManager';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private http: HttpService) { }
  public addTaskForm: FormGroup;
  public task:TaskManager;
  submitted = false;
  ngOnInit() {
    this.addTaskForm = new FormGroup({
      task: new FormControl('',Validators.required),
      priority: new FormControl('',Validators.required),
      parentTask: new FormControl(''),
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl()
    });

    }

    onAdd(){
      this.submitted=true;
       // stop here if form is invalid
       if (this.addTaskForm.invalid) {
        return;
       } else {
       this.task = this.addTaskForm.value;
       console.log("this.task::::"+this.task);
       let body = JSON.stringify(this.task);
       console.log("body:::"+body);
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
