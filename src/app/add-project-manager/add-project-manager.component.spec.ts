import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectManagerComponent } from './add-project-manager.component';

describe('AddProjectManagerComponent', () => {
  let component: AddProjectManagerComponent;
  let fixture: ComponentFixture<AddProjectManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
