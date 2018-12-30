import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';

import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {FilterPipe} from 'src/app/services/filter.pipe';
import {Data} from '../providers/data';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { AddProjectManagerComponent } from 'src/app/add-project-manager/add-project-manager.component';
import { AddTaskComponent } from 'src/app/add-task/add-task.component';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { ViewTaskComponent } from 'src/app/view-task/view-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {UserFilterPipe} from 'src/app/services/user.filter.pipe';
import {ProjectFilterPipe} from 'src/app/services/project.filter.pipe';

const appRoutes: Routes = [
  { path: 'add-task', component:  AddTaskComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-task', component: ViewTaskComponent },
  { path: 'add-project-manager', component: AddProjectManagerComponent }
];

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports: [HttpClientModule,ReactiveFormsModule,
        RouterTestingModule, FormsModule,
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        )], 
      declarations: [ TaskComponent,AddTaskComponent,AddUserComponent
        ,ViewTaskComponent,AddProjectManagerComponent,UserFilterPipe,ProjectFilterPipe,FilterPipe ],
      providers: [HttpService,Data],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
