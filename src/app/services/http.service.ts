import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from "node_modules/rxjs"
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private base_url:String ="http://localhost:8091/";
  
  constructor(private http: HttpClient) { }

  post(url, body): Observable<any>{
    let httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post(this.base_url+url,body, httpOptions);
  }
  get(url,options?): Observable<any>{
    return this.http.get(this.base_url+url, options);
  }

  delete(url, options?): Observable<any>{
    return this.http.delete(this.base_url+url,options);
  }

}
