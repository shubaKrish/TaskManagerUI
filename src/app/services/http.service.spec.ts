import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { ReactiveFormsModule,FormControl,FormsModule,FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule,ReactiveFormsModule, 
    ], 
  providers: [HttpService]}));
  
  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
