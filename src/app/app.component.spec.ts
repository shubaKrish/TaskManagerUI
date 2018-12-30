import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AddTaskComponent } from 'src/app/add-task/add-task.component';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { ViewTaskComponent } from 'src/app/view-task/view-task.component';
import { AddProjectManagerComponent } from 'src/app/add-project-manager/add-project-manager.component';
import { RouterModule, Routes } from '@angular/router';
import {UserFilterPipe} from 'src/app/services/user.filter.pipe';
import {ProjectFilterPipe} from 'src/app/services/project.filter.pipe';
import {FilterPipe} from 'src/app/services/filter.pipe';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
const appRoutes: Routes = [
  { path: 'add-task', component:  AddTaskComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-task', component: ViewTaskComponent },
  { path: 'add-project-manager', component: AddProjectManagerComponent }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientModule,FormsModule,ReactiveFormsModule,
        RouterModule.forRoot(
          appRoutes)
      ],
      declarations: [
        AppComponent,AddTaskComponent,AddUserComponent,
        ,ViewTaskComponent,AddProjectManagerComponent,UserFilterPipe,ProjectFilterPipe,FilterPipe
      ],
      providers: [HttpService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));


});
