import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { TaskManager } from 'src/app/model/taskManager';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  public taskManager: TaskManager;
  public searchTaskDesc: string;
  public searchParentDesc: string;
  public searchPriorityFrom:number;
  public searchPriorityTo:number;
  public searchStartDate: Date;
  public tasklist:TaskManager[];
  constructor(private fb: FormBuilder, private http: HttpService,
  private inputElement: ElementRef) { }
  

  ngOnInit() {
    this.getTaskList();
    
  }

  getTaskList() {
    this.http.get("v1/retrieve/taskmanager").subscribe(
      data => { this.tasklist = data},
      err => console.error(err)
    );

  }

  onTaskDescInputChange(event,i){
    this.tasklist[i].task = event;
  }

  onEdit(i){
    let element = this.inputElement.nativeElement.querySelectorAll("#task");
    element[i].disabled = false;
    element[i].focus();
    let parentElement = this.inputElement.nativeElement.querySelectorAll("#parentTask");
    parentElement[i].disabled = false;
  }

  onParentDescInputChange(event,i){
    this.tasklist[i].parentTask = event;
  }

  onTaskDescBlur(i){
    let taskId = this.tasklist[i].taskId;
    this.updateTaskManagerService(taskId,this.tasklist[i]);
    let element = this.inputElement.nativeElement.querySelectorAll("#task");
    element[i].disabled = true;
    let parentElement = this.inputElement.nativeElement.querySelectorAll("#parentTask");
    parentElement[i].focus();
 }

 onParentTaskDescBlur(i){
  let taskId = this.tasklist[i].taskId;
  this.updateTaskManagerService(taskId,this.tasklist[i]);
  let parentElement = this.inputElement.nativeElement.querySelectorAll("#parentTask");
  parentElement[i].disabled = true;
}

 updateTaskManagerService(taskId,task){
  let body = JSON.stringify(task);
  let url = "v1/update/taskmanager/"+taskId;
  this.callPOSTRestWebService(url,body);

}

callPOSTRestWebService(url,body){
  this.http.post(url,body).subscribe
  (data=>console.log(data), err=> console.log(err));
}

onEndTask(i){
  this.tasklist[i].endDate = new Date();
  let body = JSON.stringify(this.tasklist[i]);
  let url = "v1/update/taskmanager/"+this.tasklist[i].taskId+"/endTask";
  this.callPOSTRestWebService(url,body);
}
}
