import { Component,OnInit,inject } from '@angular/core';
import { CommonModule,CurrencyPipe,DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee,DashboardStats } from './employee.model';
@Component({
 selector:'app-dashboard',standalone:true,imports:[CommonModule,RouterLink,CurrencyPipe,DatePipe],
 template:`
 <div class="heading"><div><label>OVERVIEW</label><h1>Good to see you, Harsh ✦</h1><p>Here's what's happening with your team today.</p></div><a class="primary" routerLink="/employees/new">＋ Add employee</a></div>
 @if(error){<div class="error">{{error}} Make sure the Spring Boot backend is running.</div>}
 <div class="stats">
  <article><small>Total employees</small><strong>{{stats?.totalEmployees ?? '—'}}</strong><em>All records</em></article>
  <article><small>Active employees</small><strong>{{stats?.activeEmployees ?? '—'}}</strong><em>Currently active</em></article>
  <article><small>Departments</small><strong>{{stats?.departmentCount ?? '—'}}</strong><em>Organization</em></article>
  <article><small>Average salary</small><strong>{{stats?.averageSalary ?? 0 | currency:'INR':'symbol':'1.0-0'}}</strong><em>Per month</em></article>
 </div>
 <div class="columns">
  <section class="panel"><div class="panel-head"><div><h2>Team distribution</h2><p>Employees by department</p></div></div>
   @for(item of departments;track item.name){<div class="dept"><span>{{item.name}}</span><b>{{item.count}}</b></div><div class="track"><i [style.width.%]="item.count/(stats?.totalEmployees || 1)*100"></i></div>}
   @if(!departments.length){<p class="muted">No department data yet.</p>}
  </section>
  <section class="panel"><h2>Quick actions</h2><p class="muted">Common tasks</p>
   <a class="quick" routerLink="/employees/new">＋ <span><b>Add a new employee</b><small>Create an employee record</small></span> →</a>
   <a class="quick" routerLink="/employees">☷ <span><b>View all employees</b><small>Search and manage your team</small></span> →</a>
  </section>
 </div>
 <section class="panel recent"><div class="panel-head"><div><h2>Recently added employees</h2><p>Your latest team members</p></div><a routerLink="/employees">View all →</a></div>
  <div class="table-scroll"><table><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>DESIGNATION</th><th>JOINING DATE</th><th>STATUS</th></tr></thead><tbody>
  @for(e of recent;track e.id){<tr><td><b>{{e.firstName}} {{e.lastName}}</b><small>{{e.employeeCode}}</small></td><td>{{e.department}}</td><td>{{e.designation}}</td><td>{{e.joiningDate|date:'dd MMM yyyy'}}</td><td><span class="status" [class.active]="e.status==='ACTIVE'">{{e.status}}</span></td></tr>}
  </tbody></table></div>
 </section>`
})
export class DashboardComponent implements OnInit {
 private service=inject(EmployeeService);stats:DashboardStats|null=null;recent:Employee[]=[];error='';
 get departments(){return Object.entries(this.stats?.departmentBreakdown??{}).map(([name,count])=>({name,count}));}
 ngOnInit(){this.service.stats().subscribe({next:x=>this.stats=x,error:()=>this.error='Unable to load dashboard.'});
//  this.service.list().subscribe({next:x=>this.recent=x.slice(0,5),error:()=>this.error='Unable to load employees.'});}
this.service.list('', '', '').subscribe({
  next: x => this.recent = x.slice(0, 5),
  error: e => this.error = 'Could not load dashboard data.'
});}
}
