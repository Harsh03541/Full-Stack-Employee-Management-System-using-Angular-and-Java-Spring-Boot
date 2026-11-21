import { Component,OnInit,inject } from '@angular/core';
import { CommonModule,CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee,EmployeeStatus } from './employee.model';
@Component({
 selector:'app-employee-list',standalone:true,imports:[CommonModule,FormsModule,RouterLink,CurrencyPipe],
 template:`
 <div class="heading"><div><label>PEOPLE DIRECTORY</label><h1>Employees</h1><p>Manage your people, all in one place.</p></div><a class="primary" routerLink="/employees/new">＋ Add employee</a></div>
 @if(message){<div class="success">{{message}}</div>} @if(error){<div class="error">{{error}}</div>}
 <section class="panel">
  <div class="filters"><input placeholder="Search name, email or employee ID..." [(ngModel)]="search" (ngModelChange)="load()">
   <select [(ngModel)]="department" (ngModelChange)="load()"><option value="">All departments</option>@for(d of departments;track d){<option>{{d}}</option>}</select>
   <select [(ngModel)]="status" (ngModelChange)="load()"><option value="">All statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select>
  </div>
  <p class="muted"><b>{{employees.length}} employees</b> · Employee directory</p>
  @if(loading){<p class="muted">Loading employees...</p>}
  @else if(employees.length){<div class="table-scroll"><table><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>DESIGNATION</th><th>SALARY</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>
   @for(e of employees;track e.id){<tr><td><b>{{e.firstName}} {{e.lastName}}</b><small>{{e.employeeCode}} · {{e.email}}</small></td><td>{{e.department}}</td><td>{{e.designation}}</td><td>{{e.salary|currency:'INR':'symbol':'1.0-0'}}</td><td><span class="status" [class.active]="e.status==='ACTIVE'">{{e.status}}</span></td><td><a [routerLink]="['/employees',e.id,'edit']">Edit</a>　<button class="delete" (click)="remove(e)">Delete</button></td></tr>}
  </tbody></table></div>}@else{<div class="empty"><h3>No employees found</h3><p>Try another search or add a new employee.</p><a class="primary" routerLink="/employees/new">Add employee</a></div>}
 </section>`
})
export class EmployeeListComponent implements OnInit {
 private service=inject(EmployeeService);employees:Employee[]=[];search='';department='';status:EmployeeStatus|''='';loading=false;error='';message='';
 departments=['Engineering','Human Resources','Finance','Marketing','Operations','Sales','Design'];
 ngOnInit(){this.load();}
 load(){this.loading=true;this.service.list(this.search,this.department,this.status).subscribe({next:x=>{this.employees=x;this.loading=false;},error:()=>{this.error='Could not load employees. Is the backend running?';this.loading=false;}});}
 remove(e:Employee){if(!confirm(`Delete ${e.firstName} ${e.lastName}?`))return;this.service.delete(e.id).subscribe({next:()=>{this.message='Employee deleted successfully.';this.load();},error:()=>this.error='Could not delete employee.'});}
}
