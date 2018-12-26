import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTaskComponent } from 'src/app/view-task/view-task.component';
import { AddTaskComponent } from 'src/app/add-task/add-task.component';
import { TaskComponent } from 'src/app/task/task.component';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { RouterModule, Routes } from '@angular/router';
import { FilterPipe} from 'src/app/services/filter.pipe';
import {UserFilterPipe} from 'src/app/services/user.filter.pipe';
import {ProjectFilterPipe} from 'src/app/services/project.filter.pipe';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectManagerComponent } from './add-project-manager/add-project-manager.component';
import {Data} from './providers/data';
const appRoutes: Routes = [
  { path: 'add-task', component:  AddTaskComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-task', component: ViewTaskComponent },
  { path: 'add-project-manager', component: AddProjectManagerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TaskComponent,
    ViewTaskComponent,
    FilterPipe,
    AddUserComponent,
    UserFilterPipe,
    ProjectFilterPipe,
    AddProjectManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [HttpService,Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
