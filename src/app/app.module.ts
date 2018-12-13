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


const appRoutes: Routes = [
  { path: 'add-task', component:  AddTaskComponent},
  { path: 'view-task', component: ViewTaskComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TaskComponent,
    ViewTaskComponent,
    FilterPipe
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
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
