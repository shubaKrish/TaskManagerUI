import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {FilterPipe} from 'src/app/services/filter.pipe';
import {Data} from '../providers/data';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,ReactiveFormsModule, FormsModule,
        RouterModule], 
      declarations: [ AddTaskComponent,FilterPipe],
      providers: [HttpService,Data]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit(); 
  });

 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.addTaskForm.valid).toBeFalsy();
  });

  

  it('task field validity - required', () => {
    let errors = {};
    let task = component.addTaskForm.controls['task'];
    expect(task.valid).toBeFalsy();

    // Project field is required
    errors = task.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set task to something
    task.setValue("test");
    errors = task.errors || {};
    expect(errors['required']).toBeFalsy();
    
  });


  it('project field validity - required', () => {
    let errors = {};
    let projectId = component.addTaskForm.controls['projectId'];
    expect(projectId.valid).toBeFalsy();

    // Project field is required
    errors = projectId.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set Project to something
    projectId.setValue("test");
    errors = projectId.errors || {};
    expect(errors['required']).toBeFalsy();
    
  });

  it('start date field validity', () => {
    let errors = {};
    let startDate = component.addTaskForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();    
  });


  it('End Date field validity', () => {
    let endDate = component.addTaskForm.controls['endDate'];
    endDate.setValue(new Date("10/11/2019").getDate());
    fixture.detectChanges();
    expect(endDate.value).toBe(new Date("10/11/2019").getDate());    
  }); 

  it('Priority field validity', () => {
    let priority = component.addTaskForm.controls['priority'];     
    expect(priority.valid).toBeTruthy(); 
    priority.setValue(12);
    fixture.detectChanges();
    expect(priority.value).toBe(12);      
  }); 

  it('User field validity', () => {
    let user = component.addTaskForm.controls['user'];
    expect(user.valid).toBeTruthy(); 
    user.setValue("mgr");
    fixture.detectChanges();
    expect(user.value).toBe("mgr");       
  }); 

  it('Parent field validity', () => {
    let parentTask = component.addTaskForm.controls['parentTask'];
    expect(parentTask.valid).toBeTruthy(); 
    parentTask.setValue("parentTask");
    component.isParenTaskEnabled = true;
    fixture.detectChanges();
    expect(parentTask.value).toBe("parentTask");       
  }); 

  it('submitting a form', () => {
    component.isEdit = false;
    component.isParenTaskEnabled = false;
    fixture.detectChanges();
    expect(component.addTaskForm.valid).toBeFalsy();
    component.addTaskForm.controls['projectId'].setValue(12);
    component.addTaskForm.controls['task'].setValue("task1");
    component.addTaskForm.controls['startDate'].setValue(new Date().getDate());
    component.addTaskForm.controls['endDate'].setValue(new Date().getDate());
    component.addTaskForm.controls['priority'].setValue(1);
    component.addTaskForm.controls['parentId'].setValue(12);
    component.addTaskForm.controls['user'].setValue(12);
    expect(component.addTaskForm.valid).toBeTruthy();    
    component.onAdd();
    expect(component.task.parentId).toBe(12); 
    expect(component.task.task).toBe("task1"); 
    expect(component.task.projectId).toBe(12);  
    expect(component.task.priority).toBe(1);
    expect(component.task.user.userId).toBe(12);
  });

});
