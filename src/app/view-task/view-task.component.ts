import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Project } from 'src/app/model/project';
import { TaskManager } from 'src/app/model/taskManager';
import {Router,ActivatedRoute,NavigationExtras} from '@angular/router';
import {Data} from '../providers/data';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  public taskManager: TaskManager;
  public tasklist:TaskManager[];
  public projects: Project[];
  public searchFlag: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpService,
  private inputElement: ElementRef, private router: Router,private data:Data) { }
  

  ngOnInit() {
    this.getTaskList();
    this.getProjectList();
  }

  getTaskList() {
    this.http.get("v1/retrieve/taskmanager").subscribe(
      data => { this.tasklist = data, console.log("data in view task::"+data)},
      err => console.error(err)
    );

  }

  getProjectList(){
    this.http.get("v1/retrieve/projects").subscribe
    (data=> {this.projects = data, console.log(data)},
      error=> console.log(error));  
  }

  onSearch(){
    this.searchFlag = true;
  }


  onEdit(i){
    this.data.storage = this.tasklist[i];
    this.router.navigate(['add-task']);
  }

 

callPOSTRestWebService(url,body){
  this.http.post(url,body).subscribe
  (data=>console.log(data), err=> console.log(err));
}

onEndTask(i){
  this.tasklist[i].endDate = new Date();
  this.tasklist[i].status = 'Complete';
  let body = JSON.stringify(this.tasklist[i]);
  let url = "v1/update/taskmanager/"+this.tasklist[i].taskId+"/endTask";
  this.callPOSTRestWebService(url,body);
}


sortByStartDate(){
  if(this.tasklist!=null && this.tasklist!=undefined){
    this.tasklist.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());    
  }

}


sortByCompleted(){
  if(this.tasklist!=null && this.tasklist!=undefined){
    this.tasklist = this.tasklist.sort((t1:TaskManager,t2:TaskManager)=> {
      if (t1.status=="Complete" && t2.status!="Complete") {
          return -1;
      }
      if (t1.status!="Complete" && t2.status=="Complete") {
          return 1;
      }
      return 0;
  });
}
}

sortByEndDate(){
  if(this.tasklist!=null && this.tasklist!=undefined){
    this.tasklist.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());        
  }

}

sortByPriority(){
  if(this.tasklist!=null && this.tasklist!=undefined){
      this.tasklist = this.tasklist.sort((t1:TaskManager,t2:TaskManager)=> {
        if (t1.priority > t2.priority) {
            return 1;
        }
        if (t1.priority < t2.priority) {
            return -1;
        }
        return 0;
    });
  }
}


}
