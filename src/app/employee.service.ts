import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee,EmployeePayload,DashboardStats,EmployeeStatus } from './employee.model';
@Injectable({providedIn:'root'})
export class EmployeeService {
 private http=inject(HttpClient); private url='/api/employees';
 list(search='',department='',status:EmployeeStatus|' '|''):Observable<Employee[]>{
  let p=new HttpParams(); if(search.trim())p=p.set('search',search.trim());
  if(department)p=p.set('department',department);if(status)p=p.set('status',status);
  return this.http.get<Employee[]>(this.url,{params:p});
 }
 get(id:number){return this.http.get<Employee>(`${this.url}/${id}`);}
 create(data:EmployeePayload){return this.http.post<Employee>(this.url,data);}
 update(id:number,data:EmployeePayload){return this.http.put<Employee>(`${this.url}/${id}`,data);}
 delete(id:number){return this.http.delete<void>(`${this.url}/${id}`);}
 stats(){return this.http.get<DashboardStats>(`${this.url}/stats`);}
}
