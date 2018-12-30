import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';

import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {UserFilterPipe} from 'src/app/services/user.filter.pipe';
import {Data} from '../providers/data';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';

const appRoutes: Routes = [
  { path: 'add-user', component: AddUserComponent }
];

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,ReactiveFormsModule, FormsModule,
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        )], 
      declarations: [ AddUserComponent,UserFilterPipe],
      providers: [HttpService,Data]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.addUserForm.valid).toBeFalsy();
  });

  

  it('firstName field validity - required', () => {
    let errors = {};
    let firstName = component.addUserForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    // firstName field is required
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set firstName to something
    firstName.setValue("test");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    
  });


  it('last name field validity - required', () => {
    let errors = {};
    let lastName = component.addUserForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    // last Name field is required
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set last Name to something
    lastName.setValue("test");
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    
  });


  it('employee id field validity - required', () => {
    let errors = {};
    let employeeId = component.addUserForm.controls['employeeId'];
    expect(employeeId.valid).toBeFalsy();

    // employeeId field is required
    errors = employeeId.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set employeeId to something
    employeeId.setValue("test");
    errors = employeeId.errors || {};
    expect(errors['required']).toBeFalsy();
    
  });


  it('submitting a form', () => {
    component.isEdit = false;
    fixture.detectChanges();
    expect(component.addUserForm.valid).toBeFalsy();
    component.addUserForm.controls['firstName'].setValue("test");
    component.addUserForm.controls['lastName'].setValue("test");
    component.addUserForm.controls['employeeId'].setValue(11);
    expect(component.addUserForm.valid).toBeTruthy();    
    component.onAddorUpdateUser();
    expect(component.user.firstName).toBe("test"); 
    expect(component.user.lastName).toBe("test"); 
    expect(component.user.employeeId).toBe(11); 
  });
});
