import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectManagerComponent } from './add-project-manager.component';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {ProjectFilterPipe} from 'src/app/services/project.filter.pipe';
import {Data} from '../providers/data';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { Project } from 'src/app/model/project';

describe('AddProjectManagerComponent', () => {
  let component: AddProjectManagerComponent;
  let fixture: ComponentFixture<AddProjectManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,ReactiveFormsModule, FormsModule,
        RouterModule], 
      declarations: [ AddProjectManagerComponent,ProjectFilterPipe ],
      providers: [HttpService,Data]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectManagerComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); 
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.addProjectForm.valid).toBeFalsy();
  });

  

  it('project field validity - required', () => {
    let errors = {};
    let proj = component.addProjectForm.controls['project'];
    expect(proj.valid).toBeFalsy();

    // Project field is required
    errors = proj.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set Project to something
    proj.setValue("test");
    errors = proj.errors || {};
    expect(errors['required']).toBeFalsy();
    
  });


  it('dates field validity', () => {
    let dates = component.addProjectForm.controls['dates'];
    expect(dates.valid).toBeTruthy();    
    dates.setValue(true);
    fixture.detectChanges();
    expect(dates.value).toBe(true);   
  }); 

  it('Start Date field validity', () => {
    let startDate = component.addProjectForm.controls['startDate'];
    startDate.setValue(new Date("10/11/2019").getDate());
    fixture.detectChanges();
    expect(startDate.value).toBe(new Date("10/11/2019").getDate());    
  }); 


  it('End Date field validity', () => {
    let endDate = component.addProjectForm.controls['endDate'];
    endDate.setValue(new Date("10/11/2019").getDate());
    fixture.detectChanges();
    expect(endDate.value).toBe(new Date("10/11/2019").getDate());    
  }); 

  it('Priority field validity', () => {
    let priority = component.addProjectForm.controls['priority'];     
    expect(priority.valid).toBeTruthy(); 
    priority.setValue(12);
    fixture.detectChanges();
    expect(priority.value).toBe(12);      
  }); 

  it('Manager field validity', () => {
    let manager = component.addProjectForm.controls['manager'];
    expect(manager.valid).toBeTruthy(); 
    manager.setValue("mgr");
    fixture.detectChanges();
    expect(manager.value).toBe("mgr");       
  }); 

  it('submitting a form', () => {
    component.isEdit = false;
    fixture.detectChanges();
    expect(component.addProjectForm.valid).toBeFalsy();
    component.addProjectForm.controls['project'].setValue("project1");
    component.addProjectForm.controls['dates'].setValue("true");
    component.addProjectForm.controls['startDate'].setValue(new Date().getDate());
    component.addProjectForm.controls['endDate'].setValue(new Date().getDate());
    component.addProjectForm.controls['priority'].setValue(1);
    component.addProjectForm.controls['manager'].setValue("mgr");
    expect(component.addProjectForm.valid).toBeTruthy();    
    component.onAdd();
  });

});
