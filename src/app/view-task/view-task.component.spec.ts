import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';

import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {FilterPipe} from 'src/app/services/filter.pipe';
import {Data} from '../providers/data';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { RouterTestingModule } from '@angular/router/testing';

const appRoutes: Routes = [  
  { path: 'view-task', component: ViewTaskComponent }
];

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,ReactiveFormsModule, 
        RouterTestingModule, FormsModule,
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        )], 
      declarations: [ ViewTaskComponent,FilterPipe],
      providers: [HttpService,Data]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
